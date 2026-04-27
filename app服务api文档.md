### 体育API域名

黑豹体育不需要区分地区域名，全部使用 api.bpapiglobal.com 请求。

### 登录模式

当使用API获取游戏登陆链接成功后，可以得到如下链接:  
https://${host}/games/enter?id=200101&lang=zh&playerGameToken=abc123&reqt=xxx&esign=xxx

### HB SPORT 场次gameField （胜率）定义，字段类型为整数，目前HB Sport生效

| **GameFeild** | 说明 |
| --- | --- |
| 20001 | A级别：不进行赔率调整 |
| 20002 | B级别：浮动范围 ±0.01（总幅度 0.02，默认等级） |
| 20003 | C级别：浮动范围 ±0.02（总幅度 0.04） |
| 20004 | D级别：浮动范围 ±0.03（总幅度 0.06） |
| 20005 | E级别：浮动范围 ±0.05（总幅度 0.10） |
| 20006 | F级别：浮动范围 ±0.10（总幅度 0.20） |
| 20007 | G级别：浮动范围 ±0.15（总幅度 0.30） |

## Query 参数

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| id | string | 是 | 游戏ID，固定：200101 |
| lang | string | 是 | 语言（小写：en / zh / pt） |
| playerGameToken | string | 否 | 玩家Token，不传则为游客模式 |
| reqt | string | 是 | 请求唯一标识 |
| esign | string | 是 | 请求签名 |
| ui | string | 否 | UI版本（h5 / pcOld / pcNew） |

---

### 游客模式

不传 playerGameToken 时，将以游客身份进入游戏。  
https://${host}/games/enter?id=200101&lang=en&reqt=xxx&esign=xxx

### 登录模式并指定 UI 版本

h5 → 手机端（移动端版）  
pcOld → PC经典版  
pcNew → PC国际版

示例：  
https://${host}/games/enter?id=200101&playerGameToken&lang=zh&ui=h5&reqt=xxx&esign=xxx

## 说明

playerGameToken 决定登录或游客模式  
lang 必须为小写，不合法值默认使用英语  
ui 可覆盖默认设备判断，若不传，系统将根据设备自动选择  
reqt 和 esign 必须传递以保证安全性

# 结算流程

## 系统钱包/单一钱包

系统钱包对接的模式下不需要调整，保持正常的回调。  
**rt 字段说明：**rt=0,正常结算；rt=10，说明这次得分是订单退款或者订单取消返回的现金。

**rde 字段说明：** 回调参数的 rde，说明这一次余额变动的类型，具体说明如下。  

| 类型 | 说明 |  
| -- | -- |  
| BET | 押注 |  
| WIN | 派彩 |  
| REFUND | 退款 |  
| CASHOUT | 提前结算 |  
| CANCEL_DEDUCT | 订单取消补扣 |  
| CANCEL_RETURN | 订单取消返还 |  
| SETTLEMENT_ROLLBACK_DEDUCT | 结算回滚补扣 |  
| SETTLEMENT_ROLLBACK_RETURN | 结算回滚返還 |  
| CASHOUT_CANCEL_DEDUCT | 提前结算订单取消补扣 |  
| CASHOUT_CANCEL_RETURN | 提前结算订单取消返还 |  
| CASHOUT_CANCEL_ROLLBACK_DEDUCT | 提前结算取消回滚补扣 |  
| CASHOUT_CANCEL_ROLLBACK_RETURN | 提前结算取消回滚返还 |

## 转账钱包

**黑豹体育在转账钱包模式也需要在后台填写回调地址**，如果扣款遇到转账钱包余额不足，系统会通过回调地址通知第三方进行转入，需要转入的余额为 co 字段。

测试方式，操作转账钱包转出余额后，再次进行投注即可触发转账钱包的回调通知。

# 订单详情解析（Order Analyze）

## 接口地址

GET https://${host}/analyze/order/index.html#content=xxx

---

## host 说明

host 为页面访问域名，例如：  
hbsports.southasiabp.biz

---

## 参数

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| content | string | 是 | 订单数据（Base64 编码后的 JSON 字符串） |

## 示例

### 基础使用

将订单数据通过 `#content` 传入页面：  
https://${host}/analyze/order/index.html#content=xxx

---

### content 生成方式

数据需按以下步骤处理：  
JSON → Base64 →（可选）URL 编码

示例：

```js
const data = [/* 订单数据 */]
const json = JSON.stringify(data)
const base64 = btoa(unescape(encodeURIComponent(json)))
const content = encodeURIComponent(base64)
```

示例订单数据：

```json
[{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692783442032329535","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692783442032329279","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774873929612","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692783442032329279","ip":"172.71.211.53","itemCount":1,"liabilityStake":"20","loseAmount":"76.4","maxStake":"770000","maxWinAmount":"56.4","modifyTime":"1774873930192","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"76.4","settleTime":"1775009152845","stakeAmount":"20","tranType":1,"unitStake":"20","userId":"2885951","userName":"test_123321113","validSettleAmount":"76.4","validSettleStakeAmount":"20","version":5,"walletType":2}]
```

最终生成 URL：  
[https://hbsports.southasiabp.biz/analyze/order/index.html#content=W3siYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjk1MzUiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyNzgzNDQyMDMyMzI5Mjc5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzM5Mjk2MTIiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjkyNzkiLCJpcCI6IjE3Mi43MS4yMTEuNTMiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMjAiLCJsb3NlQW1vdW50IjoiNzYuNCIsIm1heFN0YWtlIjoiNzcwMDAwIiwibWF4V2luQW1vdW50IjoiNTYuNCIsIm1vZGlmeVRpbWUiOiIxNzc0ODczOTMwMTkyIiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjA0MDAsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiI3Ni40Iiwic2V0dGxlVGltZSI6IjE3NzUwMDkxNTI4NDUiLCJzdGFrZUFtb3VudCI6IjIwIiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjIwIiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6Ijc2LjQiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiMjAiLCJ2ZXJzaW9uIjo1LCJ3YWxsZXRUeXBlIjoyfV0=](https://fbsports.southasiabp.biz/analyze/order/index.html#content=W3siYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjk1MzUiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyNzgzNDQyMDMyMzI5Mjc5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzM5Mjk2MTIiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjkyNzkiLCJpcCI6IjE3Mi43MS4yMTEuNTMiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMjAiLCJsb3NlQW1vdW50IjoiNzYuNCIsIm1heFN0YWtlIjoiNzcwMDAwIiwibWF4V2luQW1vdW50IjoiNTYuNCIsIm1vZGlmeVRpbWUiOiIxNzc0ODczOTMwMTkyIiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjA0MDAsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiI3Ni40Iiwic2V0dGxlVGltZSI6IjE3NzUwMDkxNTI4NDUiLCJzdGFrZUFtb3VudCI6IjIwIiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjIwIiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6Ijc2LjQiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiMjAiLCJ2ZXJzaW9uIjo1LCJ3YWxsZXRUeXBlIjoyfV0%3D)

---

## 页面行为

页面加载后自动读取 `#content`参数，并按以下流程解析：

1. 读取 URL 中的 `content` 参数。
2. 对 `content` 执行 `decodeURIComponent`。
3. 校验内容是否为合法 Base64 字符串。
4. 使用 `atob` 解码，再通过 `TextDecoder` 转为 UTF-8 字符串。
5. 对字符串执行 `JSON.parse`，得到订单数组。
6. 遍历订单数组生成表格。
7. 每条订单会读取完整 `betList`，并在同一订单行中展开展示多条投注项；单关通常只有 1 条，串关会展示多条。

## 表头字段映射

页面表头与数据字段的映射关系如下：

| 页面字段 | 来源字段 | 展示规则 |
| --- | --- | --- |
| 订单号 | `o.id` | 原样展示 |
| 用户名 | `o.userName` | 原样展示 |
| 投注时间/状态 | `o.createTime`、`o.orderStatus`、`o.remark`、`b.settleResult` | `createTime` 转本地时间；若任一投注项已有 `settleResult`，状态按“已结算”展示，否则按 `orderStatus` 转状态文案；若有 `remark` 则追加显示 |
| 投注类型 | `o.seriesType`、`o.betType` | `seriesType == 0` 时固定显示“单关/Single”，否则显示 `betType` |
| 赛事 | `b.sportName`、`b.matchTime`、`b.tournamentId`、`b.matchName`、`b.tournamentName`、`b.matchId` | 遍历 `o.betList`，逐条组合展示赛事基础信息 |
| 投注详情 | `b.isInplay`、`b.marketName`、`b.optionName`、`b.betScore`、`b.betOdds`、`b.odds` | 遍历 `o.betList`，逐条展示滚球/赛前、盘口名、投注项、单项赔率、下注时比分 |
| 投注结果 | `b.settleResult`、`b.matchResult`、`b.extraInfo`、`b.matchId` | 遍历 `o.betList`，每个投注项都会保留一行位置；有 `settleResult` 的投注项会转为结果文案；若有 `matchResult` 或 `extraInfo` 则追加展示赛果；部分调试样例会按 `matchId` 兜底展示赛果 |
| 赔率 | `o.maxWinAmount`、`o.stakeAmount`、`b.betOdds`、`b.odds`、`b.oddsFormat` | 单关直接展示投注项赔率；串关优先按订单最大可赢金额反推倍率，无法反推时使用投注项赔率连乘；赔率格式取首个投注项的 `oddsFormat` |
| 名义投注额 | `o.stakeAmount` | 原样展示 |
| 扣款额 | `o.liabilityStake`、`o.stakeAmount` | 优先展示 `liabilityStake`，无值时展示 `stakeAmount` |
| 正常结算本金 | `o.stakeAmount`、`o.orderStatus`、提前结算字段 | 提前结算态显示 `0`；否则仅 `orderStatus == 5` 时显示投注本金 |
| 正常结算返还 | `o.validSettleAmount`、提前结算字段 | 提前结算态显示 `0`；否则展示 `validSettleAmount`，无值显示 `0` |
| 实际提前结算本金 | `o.cashOutStake`、`o.cashoutStake`、`o.cashOutStakeAmount`、`o.actualCashoutStake`、`o.actualCashoutPrincipal`、`o.cashOutPrincipal`、`o.liabilityCashoutStake` | 优先读取提前结算本金字段；部分调试样例缺字段时按扣款额兜底 |
| 名义提前结算本金 | `o.liabilityCashoutStake`、`o.liabilityCashOutStake`、`o.nominalCashoutStake`、`o.nominalCashoutPrincipal`、`o.cashOutStake`、`o.cashoutStake` | 优先读取名义提前结算本金字段；部分调试样例缺字段时按扣款额兜底 |
| 提前结算返还 | `o.cashOutPayoutStake`、`o.cashoutPayoutStake`、`o.cashOutPayout`、`o.cashoutPayout`、`o.cashOutReturnAmount`、`o.cashoutReturnAmount`、`o.cashOutSettleAmount`、`o.cashoutSettleAmount` | 优先读取提前结算返还字段；部分调试样例缺字段时按内置调试兜底展示 |
| 结算时间 | `o.cashOutTime`、`o.cashoutTime`、`o.cashOutSettleTime`、`o.cashoutSettleTime`、`o.cashOutCreateTime`、`o.cashoutCreateTime`、`o.settleTime` | 优先展示提前结算时间；无提前结算时间且 `orderStatus == 5` 时展示 `settleTime`；部分调试样例缺字段时按内置调试兜底展示 |
| 公司 输/赢 | 扣款额、提前结算返还、`o.stakeAmount`、`o.settleAmount`、`o.orderStatus` | 有提前结算返还时按“扣款额 - 提前结算返还”计算；否则仅 `orderStatus == 5` 时按 `stakeAmount - settleAmount` 计算 |
| 注单币种 | `o.currency` | 优先走币种映射表，取不到则原样展示 |
| IP地址 | `o.ip` | 原样展示 |
| 设备 | `o.device` | 原样展示 |
| 第三方备注 | `o.extraInfo` | 原样展示 |
| 存活关数 | `o.allUpAlive` | 表示串关订单中当前仍然有效的关数 |
| 付款状态 | `o.payStatus` | 付款状态字段，接口文档中标注为“弃用”，通常不建议作为主判断字段 |
| 数据版本 | `o.version` | 数据变更标记，按升序递增。若同一订单在多个文件中重复出现，应以 `version` 更大的那条数据为最新数据 |
| 投注项结算状态 | `b.settleStatus` | 用于判断该投注项是否已经完成结算 |
| 投注项结算结果 | `b.settleResult` | 用于表示该投注项最终赛果，例如胜、负、平、取消等 |

说明：

- `o` 表示订单对象。
- `b` 表示投注对象，当前版本会遍历 `o.betList` 中的每一个投注对象。部分订单级字段（如赔率格式）会取 `betList[0]` 作为代表值。

## 投注详情字段说明

订单详情区域主要使用 `betList` 中每一条投注项的以下字段：

| 字段名 | 说明 |
| --- | --- |
| `sportName` | 体育类型名称，如足球、篮球 |
| `matchTime` | 开赛时间，页面会转换为本地时间展示 |
| `tournamentId` | 联赛 ID |
| `matchName` | 对阵名称 |
| `tournamentName` | 联赛名称 |
| `matchId` | 比赛 ID |
| `isInplay` | 是否滚球 |
| `marketName` | 盘口名称 |
| `optionName` | 投注项名称 |
| `betScore` | 投注时比分 |
| `settleResult` | 投注结算结果 |
| `matchResult` | 赛果展示文本 |
| `odds` | 赔率值 |
| `oddsFormat` | 赔率格式 |

## 枚举定义

### 订单状态 `orderStatusMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `0` | 已创建 | Created |
| `1` | 确认中 | Confirming |
| `2` | 拒绝 | Rejected |
| `3` | 取消 | Canceled |
| `4` | 已确认 | Confirmed |
| `5` | 已结算 | Settled |

### 赔率格式 `oddsTypeMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `1` | 欧盘 | EUROPE |
| `2` | 香港盘 | HONGKONG |
| `3` | 马来盘 | MALAY |
| `4` | 印尼盘 | INDONESIA |
| `5` | 美盘 | AMERICAN |

### 结算结果 `resultMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `0` | 无结果 | NoResult |
| `2` | 平/和 | Push |
| `3` | 负/输 | Lost |
| `4` | 胜/赢 | Won |
| `5` | 赢半 | HalfWon |
| `6` | 输半 | HalfLost |
| `7` | 取消 | Canceled |

结果说明：

- `0 = 无结果`：该投注项暂未产出最终赛果，通常表示比赛未结算、数据未回传，或当前页面未展示该状态。
- `2 = 平/和`：该投注项走水，表示本次投注不输不赢，按本金原额返还。在串关中，这一关按赔率 `1` 继续计算。
- `3 = 负/输`：该投注项全输，本金不返还。在串关中，任一关为全输时，整张串关通常按失败处理。
- `4 = 胜/赢`：该投注项全赢，按完整赔率进行结算。
- `5 = 赢半`：常见于四分之一盘（如 `-0.5/1`、`-1/1.5`、`+0/0.5`）。此类盘口会拆成两半，其中一半按赢结算，另一半按平结算，因此实际效果可理解为“半赢半退”。
- `6 = 输半`：同样常见于四分之一盘。盘口拆成两半后，其中一半按输结算，另一半按平结算，因此实际效果可理解为“半输半退”。
- `7 = 取消`：该投注项被取消或无效，通常按本金原额返还。在串关中，这一关通常按赔率 `1` 处理。

补充说明：

- `赢半`、`输半` 并不是“赢了半个球”或“输了半个球”，而是因为盘口被拆成两部分后，两部分结算结果不同。
- 若前端需要给用户展示更易懂的文案，建议将 `赢半` 解释为“半赢半退”，将 `输半` 解释为“半输半退”。

计算说明：

- `赢半` 计算公式：`返还金额 = 本金 x (1 + 0.5 x (赔率 - 1))`
- `输半` 计算公式：`返还金额 = 本金 x 0.5`
- `平/和` 或 `取消` 计算公式：`返还金额 = 本金 x 1`
- `胜/赢` 计算公式：`返还金额 = 本金 x 赔率`
- `负/输` 计算公式：`返还金额 = 本金 x 0`

计算示例：

- `赢半` 示例：投注切尔西 `-0.5/1`，赔率 `1.85`，本金 `$100`，比赛结果切尔西 `1-0`。此盘口拆分为 `$50` 投 `-0.5`，`$50` 投 `-1`。其中 `-0.5` 这半全赢，返还 `$50 x 1.85 = $92.5`；`-1` 这半走水，返还 `$50 x 1 = $50`；最终总返还 `$142.5`。
- `输半` 示例：投注阿森纳 `-1/1.5`，赔率 `2.05`，本金 `$100`，比赛结果阿森纳 `1-0`。此盘口拆分为 `$50` 投 `-1`，`$50` 投 `-1.5`。其中 `-1` 这半走水，返还 `$50 x 1 = $50`；`-1.5` 这半全输，返还 `$0`；最终总返还 `$50`。
- 串关中若某一关为 `赢半`，该关可按折算系数 `1 + 0.5 x (赔率 - 1)` 继续滚动；若某一关为 `输半`，该关可按折算系数 `0.5` 继续滚动。

### 是否滚球 `inplayMap`

| 值 | 中文 | 英文 |
| --- | --- | --- |
| `true` | 滚球 | Live |
| `false` | 赛前 | PreMatch |

### 赛果提示 `resultTipMap`

| 语言 | 文案 |
| --- | --- |
| `zh` | 赛果 |
| `en` | matchResult |


## 衍生字段计算规则

### 投注类型

- `seriesType == 0` 时显示“单关（Single）”。
- 其他情况下显示 `betType` 原始值。

### 投注结果

- 遍历 `o.betList`，每个投注项都会在“投注结果”列保留对应行位，以便与“赛事”和“投注详情”逐条对齐。
- 当某条投注项的 `b.settleResult` 有值时，显示结果文案，如“赢”“输”“输半”等。
- 若 `b.matchResult` 或 `b.extraInfo` 有值，则追加显示“赛果/ matchResult”。
- 部分用于调试的历史样例缺少赛果字段，但页面为了复现示例截图，会按已知 `matchId` 兜底展示赛果；正式数据建议直接传 `matchResult` 或 `extraInfo`。
- 若 `betList` 中任一投注项存在 `settleResult`，页面状态展示会按“已结算”处理，即使订单级 `orderStatus` 仍为 `4`。

### 赔率 / 倍率

页面展示的“赔率”需要区分单关和串关：

当前版本计算优先级如下：

1. 单关或只有一条投注项时，直接使用该投注项赔率：

```txt
展示赔率 = betList[0].betOdds || betList[0].odds
```

2. 串关或 `betList` 有多条投注项时，若 `o.maxWinAmount` 和 `o.stakeAmount` 都是有效数字，且 `stakeAmount > 0`，优先使用订单最大可赢金额反推倍率：

```txt
倍率 = (maxWinAmount + stakeAmount) / stakeAmount
```

3. 串关倍率展示时向下截断两位小数：

```txt
展示倍率 = floor(倍率 * 100) / 100
```

4. 若串关订单缺少 `maxWinAmount` 或 `stakeAmount`，则退回使用 `betList` 中每条投注项的 `betOdds || odds` 连乘，并同样向下截断两位：

```txt
倍率 = betList[0].odds * betList[1].odds * ... * betList[n].odds
```

示例：

```txt
maxWinAmount = 373.66
stakeAmount = 10

倍率 = (373.66 + 10) / 10 = 38.366
展示倍率 = 38.36
```

说明：

- 只有串关才需要订单级倍率计算。
- 单关不使用 `maxWinAmount + stakeAmount` 反推倍率，直接展示投注项自身赔率。
- 串关直接将单项赔率 `1.94 * 1.86 * 3.09 * 1.85 * 1.86` 相乘会得到约 `38.3701`，四舍五入后是 `38.37`。
- 当前页面为了与订单实际可赢金额一致，串关优先使用 `maxWinAmount + stakeAmount` 反推订单倍率，因此示例会展示 `@38.36`。

### 公司 输/赢

- 当前页面同时兼容普通结算和提前结算展示。
- 涉及字段如下：

```txt
o.liabilityStake
o.stakeAmount
o.settleAmount
o.orderStatus
o.cashOutPayoutStake
o.cashoutPayoutStake
o.cashOutPayout
o.cashoutPayout
o.cashOutReturnAmount
o.cashoutReturnAmount
o.cashOutSettleAmount
o.cashoutSettleAmount
```

普通结算和提前结算的区别：

- 普通结算：比赛或投注项全部按照最终赛果完成结算后，由系统返回最终派彩金额。页面使用投注本金和最终结算返还计算公司输赢。
- 提前结算：比赛或订单尚未完全按最终赛果结算前，用户主动或系统支持提前结束订单，页面使用提前结算返还计算公司输赢。
- 同一张订单如果存在提前结算返还字段，页面优先按提前结算展示；否则才按普通结算展示。

页面计算过程如下：

1. 先确定扣款额。页面优先使用 `liabilityStake`；如果没有有效值，再使用 `stakeAmount`；如果两者都没有有效值，则扣款额按 `0` 处理。

有效值指字段不是空字符串、`undefined`、`null`，并且可以转成数字。

2. 再读取提前结算返还。页面会按以下字段顺序取第一个有效值：

`cashOutPayoutStake`、`cashoutPayoutStake`、`cashOutPayout`、`cashoutPayout`、`cashOutReturnAmount`、`cashoutReturnAmount`、`cashOutSettleAmount`、`cashoutSettleAmount`。

3. 如果读取到了提前结算返还，页面按提前结算计算公司输赢：

公司输赢 = 扣款额 - 提前结算返还

例如扣款额为 `10`，提前结算返还为 `5.52`，则公司输赢为 `10 - 5.52 = 4.48`。

4. 如果没有提前结算返还，页面再按普通结算处理。普通结算必须满足 `orderStatus == 5`，否则公司输赢显示为空。

5. 普通结算时，`stakeAmount` 和 `settleAmount` 都必须是有效值，才计算公司输赢：

公司输赢 = stakeAmount - settleAmount

例如投注本金为 `20`，普通结算返还为 `76.4`，则公司输赢为 `20 - 76.4 = -56.4`。

6. 如果普通结算下 `stakeAmount` 或 `settleAmount` 不是有效值，则公司输赢显示为空。

部分调试样例若缺失提前结算字段，页面会使用内置兜底值复现示例截图；正式数据建议传入明确的提前结算返还字段。

颜色规则：

- 结果大于 `0` 时显示红色。
- 结果小于 `0` 时显示绿色。
- 结果等于 `0` 时显示灰色。

示例：

```txt
提前结算返还 = 5.52
扣款额 = 10

公司 输/赢 = 10 - 5.52 = 4.48
```

普通结算示例：

```txt
orderStatus = 5
stakeAmount = 20
settleAmount = 76.4

公司 输/赢 = 20 - 76.4 = -56.4
```

### 提前结算列

当页面识别为提前结算态时：

- `正常结算本金` 显示 `0`。
- `正常结算返还` 显示 `0`。
- `实际提前结算本金` 优先读取 `cashOutStake/cashoutStake/cashOutStakeAmount/actualCashoutStake/actualCashoutPrincipal/cashOutPrincipal/liabilityCashoutStake`，无值时部分调试样例按扣款额兜底。
- `名义提前结算本金` 优先读取 `liabilityCashoutStake/liabilityCashOutStake/nominalCashoutStake/nominalCashoutPrincipal/cashOutStake/cashoutStake`，无值时部分调试样例按扣款额兜底。
- `提前结算返还` 优先读取 `cashOutPayoutStake/cashoutPayoutStake/cashOutPayout/cashoutPayout/cashOutReturnAmount/cashoutReturnAmount/cashOutSettleAmount/cashoutSettleAmount`。
- `结算时间` 优先读取 `cashOutTime/cashoutTime/cashOutSettleTime/cashoutSettleTime/cashOutCreateTime/cashoutCreateTime`，无提前结算时间时再按普通结算读取 `settleTime`。

## 注意事项

- `content` 必须为合法 Base64 字符串。
- `content` 解码后必须为合法 JSON 数组，否则页面无法解析。
- 建议对 Base64 结果做 URL 编码，避免 `+`、`=` 等特殊字符影响 URL 传参。
- 页面仅解析 URL 中的 `#content` 或查询参数中的 `content`。
- 页面默认使用 `lang=zh`，传 `lang=en` 可切换英文文案。
- 页面当前会遍历并展示完整 `betList`，串关订单会在同一订单行中展开多条投注项。
- `settleResult = 0` 在枚举中定义为“无结果”，当前版本只判断字段是否为 `undefined/null`，因此该值可以正常展示为“无结果”。
- `注单币种` 同时兼容数值枚举和字符串直传，渲染逻辑为 `currencyMap[o.currency] || o.currency`。

## 说明

所有数据仅在前端解析，不经过服务端。  
适用于订单展示、调试、对账等场景。

---
# 常见问题说明

## 页面数据不一致

**问：为什么页面看到的数据不一致，菜单内容不一致？**

答1：  
页面数据会根据用户所在时区进行展示，不同时区下的数据（如时间、赛事状态、菜单列表等）可能存在差异，因此会出现显示不一致的情况。

答2：  
游客用户和登入用户看到的数据可能存在差异。

## 赔率浮动不一致

**问：为什么不同用户看到的赔率浮动不一样？**

答：  
系统会根据用户等级对赔率进行差异化调整，不同等级对应不同的浮动范围。

**说明：**  
浮动范围为在基础赔率上的上下调整区间  
用户等级越高，赔率浮动范围越大  
默认用户等级为 B级别
