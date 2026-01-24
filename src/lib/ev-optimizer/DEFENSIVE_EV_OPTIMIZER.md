# Defensive EV Optimizer

## Overview

The Defensive EV Optimizer is a service that calculates optimal EV (Effort Value) distributions for defensive Pokémon in VGC (Video Game Championships) battles. It determines the minimum EV investment required in HP, Defense, and Special Defense to survive attacks from one or more opposing Pokémon.

## Main Algorithm

The optimizer follows this general flow:

1. **Target Classification**: Separates targets into single attackers and double attackers (two simultaneous attackers)
2. **Attacker Selection**: Identifies the strongest attacker(s) in each category (physical, special, double)
3. **Individual Optimization**: Optimizes EVs for each strongest attacker
4. **Solution Combination**: Combines multiple solutions to find the optimal EV distribution that satisfies all requirements

## Single Attacker Optimization

When optimizing for a single attacker (physical or special):

1. **Find First Valid Solution**: Uses binary search to find the minimum EV investment that allows survival
2. **Calculate Damage Product**: Computes HP × DEF (for physical) or HP × SPD (for special) as a measure of bulk
3. **Pre-calculate Values**: Pre-computes HP and DEF/SPD values for all EV intervals to optimize performance
4. **Generate Combinations**: Creates all valid EV combinations that meet the minimum damage product threshold (95% of initial)
5. **Sort by Total EVs**: Orders combinations by total EV investment (ascending)
6. **Test Combinations**: Tests each combination until finding one that ensures survival

### EV Intervals

EVs are distributed in "intervals" where stat values increase by 1 point. The interval sequence is: [0, 4, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92, 100, 108, 116, 124, 132, 140, 148, 156, 164, 172, 180, 188, 196, 204, 212, 220, 228, 236, 244, 252]

This optimization reduces the search space significantly compared to testing every possible EV value.

## Double Attacker Optimization

When optimizing for two simultaneous attackers, the algorithm handles three scenarios:

### Both Physical Attackers

Similar to single attacker optimization, but tests survival against both attackers simultaneously. Uses HP and DEF only.

### Both Special Attackers

Similar to single attacker optimization, but tests survival against both attackers simultaneously. Uses HP and SPD only.

### Mixed Attackers (One Physical, One Special)

More complex optimization requiring HP, DEF, and SPD:

1. **Binary Search for Minimum HP**: Uses a heuristic function to find the minimum HP that has a valid solution
2. **Find Minimum DEF**: For the given HP, finds minimum DEF needed to survive the physical attacker
3. **Find Minimum SPD**: For the given HP, finds minimum SPD needed to survive the special attacker
4. **Test Combined Survival**: Tests if HP + minDEF + minSPD survives both attackers together
5. **Try Additional Combinations**: If minimum values don't work, tries slightly higher DEF/SPD combinations
6. **Full Search**: If heuristic fails, performs full search of all HP/DEF/SPD combinations

## Solution Combination

When multiple solutions exist (physical, special, and/or double), they must be combined:

### Three Solutions Combination

1. **Check Double Solution Coverage**: Verifies if the double solution already satisfies physical and/or special requirements
2. **Discard Redundant Solutions**: Removes solutions that are already covered by the double solution
3. **Find Optimized Combined Solution**: Attempts to find a single solution that satisfies all requirements with minimum EVs
4. **Fallback Strategies**:
   - Try combining physical + special, then add double
   - Try combining physical with double
   - Try combining special with double
   - Return double solution as last resort

### Two Solutions Combination

When combining physical and special solutions:

1. **Find Optimized Combined Solution**: Attempts to find a single solution with minimum EVs
2. **Prioritize by HP**: If optimized solution not found, prioritizes the solution with higher HP
3. **Apply Remaining EVs**: Distributes remaining EVs (up to 508 total) to the other stat
4. **Verify Survival**: Tests that the combined solution survives both attackers

### Damage Product

The optimizer uses "damage product" (HP × DEF or HP × SPD) as a heuristic to filter valid combinations. This ensures that solutions maintain similar bulk while minimizing total EV investment.

## Internal Services

The optimizer is split into several internal services:

- **EvIntervalsCalculator**: Calculates EV interval values
- **SurvivalChecker**: Handles damage calculations and survival checks
- **AttackerSelector**: Identifies strongest attackers and determines priority
- **SingleAttackerOptimizer**: Optimizes for single attackers
- **DoubleAttackerOptimizer**: Optimizes for two simultaneous attackers
- **SolutionCombiner**: Combines multiple optimization solutions

## Performance Optimizations

1. **Pre-calculation**: HP, DEF, and SPD values are pre-calculated for all EV intervals to avoid repeated cloning
2. **Binary Search**: Used to find minimum valid solutions quickly
3. **Early Termination**: Stops searching once a valid solution is found
4. **Damage Product Filtering**: Reduces search space by filtering combinations below the threshold
5. **Sorting**: Combinations are sorted by total EVs to find minimum investment first

## Limitations

- Maximum total EVs: 508 (as per Pokémon rules)
- Only optimizes HP, DEF, and SPD (other stats set to 0)
- Assumes maximum damage rolls for survival calculations
- Does not account for critical hits or random damage variance beyond max damage
