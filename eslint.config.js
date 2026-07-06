// @ts-check
const eslint = require("@eslint/js")
const tseslint = require("typescript-eslint")
const angular = require("angular-eslint")

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case"
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          caughtErrors: "none",
          argsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"]
            },
            {
              group: ["@calc/*"],
              message: "Import from the calc public API (@calc) instead of reaching into @calc internals."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/domain/calc/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"]
            },
            {
              group: ["@app/*", "@basic/*", "@features/*", "@pages/*", "@core/*", "@configuration/*", "@store/*", "@multicalc/*", "@adapters/*"],
              message: "calc is the pure engine: it must not import from the domain (@multicalc), infra adapters, or the webapp/UI layer. It may only depend on @data (infra) and itself."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/domain/multicalc/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*", "@basic/*", "@features/*", "@pages/*", "@core/*", "@configuration/*", "@store/*"],
              message: "multicalc is domain-only: it must not import from the webapp/UI layer. The domain receives data as arguments."
            },
            {
              group: ["@calc/*"],
              message: "Import from the calc public API (@calc) instead of reaching into @calc internals."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/infrastructure/data/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*", "@basic/*", "@features/*", "@pages/*", "@core/*", "@configuration/*", "@store/*", "@multicalc/*", "@calc", "@calc/*", "@adapters/*"],
              message: "data is the lowest layer (infra / static data): it must not import from calc, the domain (@multicalc), adapters, or the webapp. Dependencies point downward only; data depends on nothing but itself."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/infrastructure/adapters/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@app/*", "@basic/*", "@features/*", "@pages/*", "@core/*", "@configuration/*", "@store/*"],
              message: "adapters is infra: it must not import from the webapp/UI layer. It may depend on @data, @calc and @multicalc (it translates between representations)."
            },
            {
              group: ["@calc/*"],
              message: "Import from the calc public API (@calc) instead of reaching into @calc internals."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["src/app/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@multicalc/model/*", "@multicalc/damage-calc/*", "@multicalc/speed-calc/*", "@multicalc/type-calc/*", "@multicalc/probability-calc/*", "@multicalc/ev-optimizer/*", "@multicalc/stat-calc/*", "@adapters/*"],
              message: "Import from the module's public barrel (e.g. @multicalc/model, @adapters) instead of reaching into its internals."
            }
          ]
        }
      ]
    }
  },
  {
    files: ["**/cypress/support/**/*.ts"],
    rules: {
      "@typescript-eslint/no-namespace": "off"
    }
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/alt-text": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/label-has-associated-control": "off"
    }
  }
)
