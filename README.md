# TRS vulnerablity dataset
The repository is for the work "Transaction-reverting Statement in Ethereum Smart Contracts: Characterization, Benchmark, and Evaluation".

## Overview
**Dataset:** The 91 vulnerable contracts are available in `/dataset` folder. Detailed information about the 91 contract cases is presented in `TRS_v.xlsx`.

**Tools:** Ten representive tools for experiments are listed below:
* [ContractFuzzer](https://github.com/gongbell/ContractFuzzer)
* [sFuzz](https://github.com/duytai/sFuzz)
* [SmarTian](https://github.com/SoftSec-KAIST/Smartian)
* [Oyente](https://github.com/enzymefinance/oyente)
* [Mythril](https://github.com/ConsenSys/mythril)
* [Securify](https://github.com/eth-sri/securify)
* [Maian](https://github.com/ivicanikolicsg/MAIAN)
* [Manticore](https://github.com/trailofbits/manticore)
* [Slither](https://github.com/crytic/slither)
* [VeriSmart](https://github.com/kupl/VeriSmart-public)

**Experiment Setting:**

*The default setting of runtime parameters:*
|                | Trials | Timeout | Depth Limit |
|----------------|--------|---------|-------------|
| ContractFuzzer | 1      | 80h     | -           |
| sFuzz          | 3      | 2m      | -           |
| SmarTian       | 5      | 1h      | -          |
| Oyente         | -      | 30m     | 1,024       |
| Mythril        | -      | 24h     | 22          |
| Securify       | -      | /       | -           |
| Maian          | -      | 300s    | 60          |
| Manticore      | -      | 90m     | -           |
| Slither        | -      | 2m      | -           |
| VeriSmart      | -      | 30m     | -           |



*The recommended setting of runtime parameters:*
| Parameter   | Technique                                    | Value |
|-------------|----------------------------------------------|-------|
| Depth Limit | Symbolic Execution                           | 50    |
| Trials      | Fuzzing                                      | 48    |
| Timeout (s) | Static Analysis, Fuzzing, Symbolic Execution | 3600  |

**Experiment Result:**

*The default setting of runtime parameters:*
| Tool           | TRS Omission | TRS Overuse | Improper TRS Conditions | Vulnerability Detection Rate |
|----------------|--------------|-------------|-------------------------|------------------------------|
| ContractFuzzer | 0/10         | -           | 0/4                     | 0/14 0.0%                    |
| sFuzz          | 4/18         | -           | 0/5                     | 4/23 17.45%                  |
| SmarTian       | 0/4          | 0/4         | 0/2                     | 0/10 0.0%                    |
| Oyente         | 0/3          | -           | 0/2                     | 0/5 0.0%                     |
| Mythril        | 2/57         | -           | 2/13                    | 4/70 5.7%                    |
| Maian          | 0/7          | -           | -                       | 0/7 0.0%                     |
| Manticore      | 1/31         | -           | 0/4                     | 1/35 2.9%                    |
| VeriSmart      | 0/7          | -           | 0/1                     | 0/8 0.0%                     |
| Securify       | 0/2          | -           | -                       | 0/2 0.0%                     |
| Slither        | 8/24         | -           | 2/4                     | 10/28 35.7%                  |
| Total          | 16/163       | 0/4         | 4/35                    | 20/202 10.0%                 |

*The recommended setting of runtime parameters:*
| Tool           | TRS Omission | TRS Overuse | Improper TRS Conditions | Vulnerability Detection Rate |
|----------------|--------------|-------------|-------------------------|------------------------------|
| ContractFuzzer | 0/10         | -           | 0/4                     | 0/14 0.0%                    |
| sFuzz          | 10/18        | -           | 0/5                     | 10/23 43.5%                  |
| SmarTian       | 0/4          | 0/4         | 0/2                     | 0/10 0.0%                    |
| Oyente         | 0/3          | -           | 0/2                     | 0/5 0.0%                     |
| Mythril        | 5/57         | -           | 2/13                    | 7/70 10.0%                   |
| Maian          | 0/7          | -           | -                       | 0/7 0.0%                     |
| Manticore      | 0/31         | -           | 0/4                     | 0/35 0.0%                    |
| VeriSmart      | 0/7          | -           | 0/1                     | 0/8 0.0%                     |
| Securify       | 1/2          | -           | -                       | 1/2 50.0%                    |
| Slither        | 15/24        | -           | 4/4                     | 19/28 67.9%                  |
| Total          | 31/163       | 0/4         | 6/35                    | 37/202 18.3%                 |


**Note:** For more information, please refer to our [paper]().