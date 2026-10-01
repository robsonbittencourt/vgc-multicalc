# Infrastructure

Terraform for the AWS hosting. Infrastructure changes are applied from a local machine; the GitHub pipeline only deploys site releases and never runs Terraform.

The GitHub pipeline reads the deploy target from repository variables: `AWS_REGION`, `AWS_DEPLOY_ROLE`, `SITE_BUCKET`, `DISTRIBUTION_ID` and `ACTIVE_RELEASE_PARAMETER`.

| Folder       | Purpose                                                |
| ------------ | ------------------------------------------------------ |
| `bootstrap/` | Remote state storage for the other roots (local state) |
| `site/`      | Production environment                                 |
| `dev/`       | Isolated development environment                       |
| `modules/`   | Shared modules used by `site/` and `dev/`              |

## Prerequisites

- Terraform 1.16.4, AWS CLI v2, Node 24.16.0 and `jq`.
- A valid AWS session for the project account, exported as `AWS_PROFILE`. Check it before long steps with `aws sts get-caller-identity`.

## Starting from a clean checkout

**1. Install dependencies**

```bash
npm ci
npm ci --prefix infra/modules/pastes/lambda
```

The second command is only needed to run the Lambda tests (`npm run test-lambdas`).

**2. Build the generated Lambda files**

They are not committed, and `terraform plan` fails without them:

```bash
npm run og-assets
npm run build-paste-page
```

**3. Create the state storage (once per AWS account)**

```bash
terraform -chdir=infra/bootstrap init
terraform -chdir=infra/bootstrap apply
```

Skip this step if the storage already exists. This root keeps its state locally; if that file is lost, import the existing resources before running `apply`.

**4. Apply the environment**

```bash
terraform -chdir=infra/dev init
terraform -chdir=infra/dev plan
terraform -chdir=infra/dev apply
```

Use `site` instead of `dev` for production.

**5. Deploy the first site release**

The environment serves nothing until a release is deployed:

```bash
npm run build
SITE_BUCKET=$(terraform -chdir=infra/dev output -raw site_bucket_name) \
DISTRIBUTION_ID=$(terraform -chdir=infra/dev output -raw distribution_id) \
ACTIVE_RELEASE_PARAMETER=$(terraform -chdir=infra/dev output -raw active_release_parameter_name) \
RELEASES_TO_KEEP=2 \
scripts/aws/deploy-site.sh dev
```

- Build with `npm run build`, not `ng build`: the npm script also produces the `404.html` the deploy requires.
- The deploy scripts have no default target and stop when a variable is missing. For production, use the outputs of `infra/site` or the repository variables (`gh variable list`).

## Recreating the dev distribution

The dev domain is written by hand in `public_origin` (`dev/main.tf`) and in `proxy.conf.json`. If the dev distribution is recreated:

1. Run `apply`.
2. Read the new domain with `terraform -chdir=infra/dev output -raw distribution_domain_name`.
3. Update both files.
4. Run `apply` again.

## Rebuilding the paste page Lambda

| When this changes                | Run                                                      |
| -------------------------------- | -------------------------------------------------------- |
| Pokémon, items, moves or sprites | `npm run og-assets`, `npm run build-paste-page`, `apply` |
| Code in `modules/pastes/lambda/` | `npm run build-paste-page`, `apply`                      |

Link previews depend on these files, so rebuild them whenever the app data changes.
