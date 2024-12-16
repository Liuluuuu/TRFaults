# Real-Word Study of SR Faults
To validate the relevance and investigate the security impact of our identified SR fault types, we extract SR faults from audit reports published from Oct 2023 to Oct 2024 on Code4rena, a leading smart contract auditing platform.
Specifically, we collect SR faults for fault types not covered by the SWC registry or where the number of faults is fewer than 10 in our GitHub dataset.
For each SR fault type, we define keywords that describe the features of the fault. For example, we use ''consistency'', and ''consistent/inconsistent'' for Consistency Violation fault. The complete keyword list for each SR fault appears below, while our full catalog of identified SR faults can be found in "code4rena_fault.csv".

| **Fault Type**                           | **Keywords (Case-Insensitive)**      |
|------------------------------------------|--------------------------------------|
| Consistency Violation                    | consistency, consistent/inconsistent |
| Resource Sufficiency Violation           | sufficient/insufficient, exceed      |
| Missing Account Type Verification        | account type, EOA                    |
| Atomicity Violation                      | atomicity                            |
| Time Constraint Violation                | timing, time constraint              |
| Non-asset-related Unauthorized Access    | access control                       |
| Lack of Property Check for External Call | return value                         |
| Erroneous Accounting                     | accounting, incorrect calculation    |
| Excessive Slippage                       | slippage                             |
| Number Rounding Error                    | rounding                             |
| ID Uniqueness Violation                  | unique/uniqueness, ID                |


In general, we identified 42 real-world bugs that directly correspond to 11 SR fault types. 

**We welcome additional suggestions or contributions to expand and improve the list.**

