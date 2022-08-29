# estimate gas 测试

## 预期目标

* 不传递 from 预期都能成功
* 传递 from 预期拦截 balance 不够的情况
* 传递 from 跟合约交互，且合约有 sponsor

## 具体 Case

"value": "0xde0b6b3a7640000",  1CFX

"to": "cfxtest:aat3bzj1mhgubvfj4psdety7d5x46a9v92gtj86mvj",

1155: CFXTEST:TYPE.CONTRACT:ACA5X5SV86PP18VJHHZ0J89Z9NTT3GEWH2U6DV5V2G

### 新账户(无balance)且发送余额不够

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32015,
        "message": "Can not estimate: transaction can not be executed",
        "data": "SenderDoesNotExist"
    },
    "id": "15922956697249514502"
}
```

### 发送账户余额不够

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32015,
        "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: NotEnoughCash { required: 1000000000000000001, got: 1000000000000000000, actual_gas_cost: 0, max_storage_limit_cost: 0 })",
        "data": "NotEnoughCash { required: 1000000000000000001, got: 1000000000000000000, actual_gas_cost: 0, max_storage_limit_cost: 0 }"
    },
    "id": "15922956697249514502"
}
```

### balance 不足以支付 value


```json
{
    "from": "cfxtest:aambvgtynchfv75n182h3xfe6x7t3w9bz2h524nt09",
    "to": "cfxtest:aat3bzj1mhgubvfj4psdety7d5x46a9v92gtj86mvj",
    "value": "0xde0b6b3a7640001",
    "gasPrice": "0x1"
}
```

```json
{
    "jsonrpc": "2.0",
    "error": {
        "code": -32015,
        "message": "Can not estimate: transaction execution failed, all gas will be charged (execution error: NotEnoughCash { required: 1000000000000000001, got: 1000000000000000000, actual_gas_cost: 0, max_storage_limit_cost: 0 })",
        "data": "NotEnoughCash { required: 1000000000000000001, got: 1000000000000000000, actual_gas_cost: 0, max_storage_limit_cost: 0 }"
    },
    "id": "15922956697249514502"
}
```

balance 不足以支付value, 且传参指定了 gasPrice，提示错误信息中不包含 gasFee


### 