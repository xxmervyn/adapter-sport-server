# 游戏进入接口（Game Enter）

## 接口地址

```
GET https://${host}/games/enter
```
## host 说明

`host` 为接入方使用的游戏服务域名，例如：

```
fbsports.southasiabp.biz
```

## Query 参数

| 参数名             | 类型     | 必填 | 说明                   |
| --------------- | ------ | -- | ------------------------ |
| id              | string | 是  | 游戏ID，固定：200101         |
| lang            | string | 是  | 语言（小写：en / zh / pt）   |
| playerGameToken | string | 否  | 玩家Token，不传则为游客模式   |
| reqt            | string | 是  | 请求唯一标识                 |
| esign           | string | 是  | 请求签名                     |
| ui              | string | 否  | UI版本（h5 / pcOld / pcNew） |

---

## 示例

### 登录模式

当传入 `playerGameToken` 时，接口将以登录状态进入游戏。

```
https://${host}/games/enter?id=200101&lang=zh&playerGameToken=abc123&reqt=xxx&esign=xxx
```

### 游客模式

不传 `playerGameToken` 时，将以游客身份进入游戏。

```
https://${host}/games/enter?id=200101&lang=en&reqt=xxx&esign=xxx
```

### 登录模式并指定 UI 版本

```
h5     → 手机端（移动端版）  
pcOld  → PC经典版  
pcNew  → PC国际版  
```

示例：

```
https://${host}/games/enter?id=200101&playerGameToken&lang=zh&ui=h5&reqt=xxx&esign=xxx
```

## 说明

* `playerGameToken` 决定登录或游客模式
* `lang` 必须为小写，不合法值默认使用英语
* `ui` 可覆盖默认设备判断，若不传，系统将根据设备自动选择
* `reqt` 和 `esign` 必须传递以保证安全性

<br><br><br><br><br>

# 订单详情解析（Order Analyze）

## 接口地址

```
GET https://${host}/analyze/order/index.html#content=xxx
```

------

## host 说明

`host` 为页面访问域名，例如：

```id="9n2k4v"
fbsports.southasiabp.biz
```

------

## 参数

| 参数名  | 类型   | 必填 | 说明                                    |
| ------- | ------ | ---- | --------------------------------------- |
| content | string | 是   | 订单数据（Base64 编码后的 JSON 字符串） |

## 示例

### 基础使用

将订单数据通过 `#content` 传入页面：

```
https://${host}/analyze/order/index.html#content=xxx
```

------

### content 生成方式

数据需按以下步骤处理：

```
JSON → Base64 →（可选）URL编码
```

示例：

```js
const data = [/* 订单数据 */]
const json = JSON.stringify(data)
const base64 = btoa(unescape(encodeURIComponent(json)))
const content = encodeURIComponent(base64)
```

示例订单数据：

```json
[{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692783442032329535","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692783442032329279","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774873929612","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692783442032329279","ip":"172.71.211.53","itemCount":1,"liabilityStake":"20","loseAmount":"76.4","maxStake":"770000","maxWinAmount":"56.4","modifyTime":"1774873930192","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"76.4","settleTime":"1775009152845","stakeAmount":"20","tranType":1,"unitStake":"20","userId":"2885951","userName":"test_123321113","validSettleAmount":"76.4","validSettleStakeAmount":"20","version":5,"walletType":2},
{"allUp":1,"allUpAlive":1,"betList":[{"betOdds":"1.38","betScore":"S: 0-0","extraInfo":"","id":"1692783442032329023","isInplay":true,"leaguePhase":16,"marketId":"9908293","marketName":"独赢","marketType":1005,"matchId":"1405085","matchName":"海地 vs 苏格兰","matchTime":"1781398800000","matchType":2,"odds":"1.38","oddsFormat":1,"optionName":"海地","optionType":1,"orderId":"1692783442032328767","period":1001,"settleStatus":3,"sportId":1,"sportName":"足球","tournamentId":"10583","tournamentName":"2026年国际足联世界杯‌-C组"}],"betNum":1,"betType":"1x1*1","createTime":"1774873929606","currency":13,"device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692783442032328767","ip":"172.71.211.53","itemCount":1,"liabilityStake":"20","loseAmount":"27.6","maxStake":"2190000","maxWinAmount":"7.6","merchantId":"2004064477525635073","merchantUserId":"2543652:2774873908258660186:1","modifyTime":"1774873940107","oddsChange":1,"orderStatus":4,"payStatus":1,"rollBackCount":0,"seriesType":0,"seriesValue":1,"stakeAmount":"20","unitStake":"20","userId":"2885951","version":5,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692808747979637055","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692808747979636799","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774876875146","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692808747979636799","ip":"172.71.211.54","itemCount":1,"liabilityStake":"5","loseAmount":"19.1","maxStake":"770000","maxWinAmount":"14.1","modifyTime":"1774876875585","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"19.1","settleTime":"1775009152845","stakeAmount":"5","tranType":1,"unitStake":"5","userId":"2885951","userName":"test_123321113","validSettleAmount":"19.1","validSettleStakeAmount":"5","version":5,"walletType":2},
{"allUp":1,"allUpAlive":1,"betList":[{"betOdds":"1.38","betScore":"S: 0-0","extraInfo":"","id":"1692808790929310015","isInplay":true,"leaguePhase":16,"marketId":"9908293","marketName":"独赢","marketType":1005,"matchId":"1405085","matchName":"海地 vs 苏格兰","matchTime":"1781398800000","matchType":2,"odds":"1.38","oddsFormat":1,"optionName":"海地","optionType":1,"orderId":"1692808790929309759","period":1001,"settleStatus":3,"sportId":1,"sportName":"足球","tournamentId":"10583","tournamentName":"2026年国际足联世界杯‌-C组"}],"betNum":1,"betType":"1x1*1","createTime":"1774876880925","currency":13,"device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692808790929309759","ip":"172.71.211.54","itemCount":1,"liabilityStake":"10","loseAmount":"13.8","maxStake":"2190000","maxWinAmount":"3.8","merchantId":"2004064477525635073","merchantUserId":"2543652:2774873908258660186:1","modifyTime":"1774876891086","oddsChange":1,"orderStatus":4,"payStatus":1,"rollBackCount":0,"seriesType":0,"seriesValue":1,"stakeAmount":"10","unitStake":"10","userId":"2885951","version":5,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692811779488351039","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692811779488350783","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774877228620","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692811779488350783","ip":"172.71.211.54","itemCount":1,"liabilityStake":"25","loseAmount":"95.5","maxStake":"770000","maxWinAmount":"70.5","modifyTime":"1774877228865","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"95.5","settleTime":"1775009152845","stakeAmount":"25","tranType":1,"unitStake":"25","userId":"2885951","userName":"test_123321113","validSettleAmount":"95.5","validSettleStakeAmount":"25","version":5,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"1.91","betScore":"S: 0-0","extendedParameter":"-1.25","extraInfo":"0-0","id":"1692811779488350527","isInplay":true,"leaguePhase":16,"marketId":"9908450","marketName":"让球","marketType":1000,"matchId":"1405085","matchName":"海地 vs 苏格兰","matchTime":"1781398800000","matchType":2,"odds":"1.91","oddsFormat":1,"optionName":"海地 -1/1.5","optionType":1,"orderId":"1692811779488350271","p1":-1.25,"period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"10583","tournamentName":"2026年国际足联世界杯‌-C组"}],"betNum":1,"betType":"1x1*1","createTime":"1774877228615","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692811779488350271","ip":"172.71.211.54","itemCount":1,"liabilityStake":"15","loseAmount":"28.65","maxStake":"2190000","maxWinAmount":"13.65","modifyTime":"1774877239046","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"28.65","settleTime":"1774947642235","stakeAmount":"15","tranType":1,"unitStake":"15","userId":"2885951","userName":"test_123321113","validSettleAmount":"28.65","validSettleStakeAmount":"15","version":6,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692850374802669887","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692850374802669631","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774881721676","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692850374802669631","ip":"162.158.178.198","itemCount":1,"liabilityStake":"5","loseAmount":"19.1","maxStake":"770000","maxWinAmount":"14.1","modifyTime":"1774881722609","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"19.1","settleTime":"1775009152845","stakeAmount":"5","tranType":1,"unitStake":"5","userId":"2885951","userName":"test_123321113","validSettleAmount":"19.1","validSettleStakeAmount":"5","version":5,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"1.64","betScore":"S: 1-0","extendedParameter":"0.25","extraInfo":"","id":"1692852117821194559","isInplay":true,"leaguePhase":0,"marketId":"9650670","marketName":"让球","marketType":1000,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"1.64","oddsFormat":1,"optionName":"Sassuolo Calcio +0/0.5","optionType":1,"orderId":"1692852117821194303","p1":0.25,"period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774881924748","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692852117821194303","ip":"162.158.178.198","itemCount":1,"liabilityStake":"5","loseAmount":"8.2","maxStake":"2190000","maxWinAmount":"3.2","modifyTime":"1774881924903","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"8.2","settleTime":"1774943472969","stakeAmount":"5","tranType":1,"unitStake":"5","userId":"2885951","userName":"test_123321113","validSettleAmount":"8.2","validSettleStakeAmount":"5","version":5,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1692853140761608511","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1692853140761608255","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774882043342","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1692853140761608255","ip":"162.158.178.198","itemCount":1,"liabilityStake":"5","loseAmount":"19.1","maxStake":"770000","maxWinAmount":"14.1","modifyTime":"1774882043575","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"19.1","settleTime":"1775009152845","stakeAmount":"5","tranType":1,"unitStake":"5","userId":"2885951","userName":"test_123321113","validSettleAmount":"19.1","validSettleStakeAmount":"5","version":5,"walletType":2},
{"allUp":1,"allUpAlive":0,"betList":[{"betOdds":"3.82","betScore":"S: 1-0","extraInfo":"","id":"1693240271195603263","isInplay":true,"leaguePhase":0,"marketId":"9650507","marketName":"独赢","marketType":1005,"matchId":"1410217","matchName":"Sassuolo Calcio vs Juventus Turin","matchTime":"1767987900000","matchType":2,"odds":"3.82","oddsFormat":1,"optionName":"Sassuolo Calcio","optionType":1,"orderId":"1693240271195603007","period":1001,"settleResult":4,"settleStatus":1,"sportId":1,"sportName":"足球","tournamentId":"11018","tournamentName":"Italy Serie A"}],"betNum":1,"betType":"1x1*1","createTime":"1774927111316","currency":"PHP","device":"h5","ep":0,"exchangeRate":"0.11384","id":"1693240271195603007","ip":"162.158.193.115","itemCount":1,"liabilityStake":"5","loseAmount":"19.1","maxStake":"770000","maxWinAmount":"14.1","modifyTime":"1774927111673","oddsChange":1,"operatorID":2543652,"orderStatus":5,"payStatus":4,"playerId":2774873908258660186,"rollBackCount":0,"seriesType":0,"seriesValue":1,"settleAmount":"19.1","settleTime":"1775009152845","stakeAmount":"5","tranType":1,"unitStake":"5","userId":"2885951","userName":"test_123321113","validSettleAmount":"19.1","validSettleStakeAmount":"5","version":5,"walletType":2}]
```

最终生成URL：

```id="m8s2qy"
https://fbsports.southasiabp.biz/analyze/order/index.html#content=W3siYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjk1MzUiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyNzgzNDQyMDMyMzI5Mjc5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzM5Mjk2MTIiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI3ODM0NDIwMzIzMjkyNzkiLCJpcCI6IjE3Mi43MS4yMTEuNTMiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMjAiLCJsb3NlQW1vdW50IjoiNzYuNCIsIm1heFN0YWtlIjoiNzcwMDAwIiwibWF4V2luQW1vdW50IjoiNTYuNCIsIm1vZGlmeVRpbWUiOiIxNzc0ODczOTMwMTkyIiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjAxODYsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiI3Ni40Iiwic2V0dGxlVGltZSI6IjE3NzUwMDkxNTI4NDUiLCJzdGFrZUFtb3VudCI6IjIwIiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjIwIiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6Ijc2LjQiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiMjAiLCJ2ZXJzaW9uIjo1LCJ3YWxsZXRUeXBlIjoyfSwKeyJhbGxVcCI6MSwiYWxsVXBBbGl2ZSI6MSwiYmV0TGlzdCI6W3siYmV0T2RkcyI6IjEuMzgiLCJiZXRTY29yZSI6IlM6IDAtMCIsImV4dHJhSW5mbyI6IiIsImlkIjoiMTY5Mjc4MzQ0MjAzMjMyOTAyMyIsImlzSW5wbGF5Ijp0cnVlLCJsZWFndWVQaGFzZSI6MTYsIm1hcmtldElkIjoiOTkwODI5MyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQwNTA4NSIsIm1hdGNoTmFtZSI6Iua1t+WcsCB2cyDoi4/moLzlhbAiLCJtYXRjaFRpbWUiOiIxNzgxMzk4ODAwMDAwIiwibWF0Y2hUeXBlIjoyLCJvZGRzIjoiMS4zOCIsIm9kZHNGb3JtYXQiOjEsIm9wdGlvbk5hbWUiOiLmtbflnLAiLCJvcHRpb25UeXBlIjoxLCJvcmRlcklkIjoiMTY5Mjc4MzQ0MjAzMjMyODc2NyIsInBlcmlvZCI6MTAwMSwic2V0dGxlU3RhdHVzIjozLCJzcG9ydElkIjoxLCJzcG9ydE5hbWUiOiLotrPnkIMiLCJ0b3VybmFtZW50SWQiOiIxMDU4MyIsInRvdXJuYW1lbnROYW1lIjoiMjAyNuW5tOWbvemZhei2s+iBlOS4lueVjOadr+KAjC1D57uEIn1dLCJiZXROdW0iOjEsImJldFR5cGUiOiIxeDEqMSIsImNyZWF0ZVRpbWUiOiIxNzc0ODczOTI5NjA2IiwiY3VycmVuY3kiOjEzLCJkZXZpY2UiOiJoNSIsImVwIjowLCJleGNoYW5nZVJhdGUiOiIwLjExMzg0IiwiaWQiOiIxNjkyNzgzNDQyMDMyMzI4NzY3IiwiaXAiOiIxNzIuNzEuMjExLjUzIiwiaXRlbUNvdW50IjoxLCJsaWFiaWxpdHlTdGFrZSI6IjIwIiwibG9zZUFtb3VudCI6IjI3LjYiLCJtYXhTdGFrZSI6IjIxOTAwMDAiLCJtYXhXaW5BbW91bnQiOiI3LjYiLCJtZXJjaGFudElkIjoiMjAwNDA2NDQ3NzUyNTYzNTA3MyIsIm1lcmNoYW50VXNlcklkIjoiMjU0MzY1MjoyNzc0ODczOTA4MjU4NjYwMTg2OjEiLCJtb2RpZnlUaW1lIjoiMTc3NDg3Mzk0MDEwNyIsIm9kZHNDaGFuZ2UiOjEsIm9yZGVyU3RhdHVzIjo0LCJwYXlTdGF0dXMiOjEsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzdGFrZUFtb3VudCI6IjIwIiwidW5pdFN0YWtlIjoiMjAiLCJ1c2VySWQiOiIyODg1OTUxIiwidmVyc2lvbiI6NSwid2FsbGV0VHlwZSI6Mn0sCnsiYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI4MDg3NDc5Nzk2MzcwNTUiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyODA4NzQ3OTc5NjM2Nzk5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzY4NzUxNDYiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI4MDg3NDc5Nzk2MzY3OTkiLCJpcCI6IjE3Mi43MS4yMTEuNTQiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiNSIsImxvc2VBbW91bnQiOiIxOS4xIiwibWF4U3Rha2UiOiI3NzAwMDAiLCJtYXhXaW5BbW91bnQiOiIxNC4xIiwibW9kaWZ5VGltZSI6IjE3NzQ4NzY4NzU1ODUiLCJvZGRzQ2hhbmdlIjoxLCJvcGVyYXRvcklEIjoyNTQzNjUyLCJvcmRlclN0YXR1cyI6NSwicGF5U3RhdHVzIjo0LCJwbGF5ZXJJZCI6Mjc3NDg3MzkwODI1ODY2MDE4Niwicm9sbEJhY2tDb3VudCI6MCwic2VyaWVzVHlwZSI6MCwic2VyaWVzVmFsdWUiOjEsInNldHRsZUFtb3VudCI6IjE5LjEiLCJzZXR0bGVUaW1lIjoiMTc3NTAwOTE1Mjg0NSIsInN0YWtlQW1vdW50IjoiNSIsInRyYW5UeXBlIjoxLCJ1bml0U3Rha2UiOiI1IiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6IjE5LjEiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiNSIsInZlcnNpb24iOjUsIndhbGxldFR5cGUiOjJ9LAp7ImFsbFVwIjoxLCJhbGxVcEFsaXZlIjoxLCJiZXRMaXN0IjpbeyJiZXRPZGRzIjoiMS4zOCIsImJldFNjb3JlIjoiUzogMC0wIiwiZXh0cmFJbmZvIjoiIiwiaWQiOiIxNjkyODA4NzkwOTI5MzEwMDE1IiwiaXNJbnBsYXkiOnRydWUsImxlYWd1ZVBoYXNlIjoxNiwibWFya2V0SWQiOiI5OTA4MjkzIiwibWFya2V0TmFtZSI6IueLrOi1oiIsIm1hcmtldFR5cGUiOjEwMDUsIm1hdGNoSWQiOiIxNDA1MDg1IiwibWF0Y2hOYW1lIjoi5rW35ZywIHZzIOiLj+agvOWFsCIsIm1hdGNoVGltZSI6IjE3ODEzOTg4MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIxLjM4Iiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6Iua1t+WcsCIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyODA4NzkwOTI5MzA5NzU5IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVTdGF0dXMiOjMsInNwb3J0SWQiOjEsInNwb3J0TmFtZSI6Iui2s+eQgyIsInRvdXJuYW1lbnRJZCI6IjEwNTgzIiwidG91cm5hbWVudE5hbWUiOiIyMDI25bm05Zu96ZmF6Laz6IGU5LiW55WM5p2v4oCMLUPnu4QifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzY4ODA5MjUiLCJjdXJyZW5jeSI6MTMsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI4MDg3OTA5MjkzMDk3NTkiLCJpcCI6IjE3Mi43MS4yMTEuNTQiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMTAiLCJsb3NlQW1vdW50IjoiMTMuOCIsIm1heFN0YWtlIjoiMjE5MDAwMCIsIm1heFdpbkFtb3VudCI6IjMuOCIsIm1lcmNoYW50SWQiOiIyMDA0MDY0NDc3NTI1NjM1MDczIiwibWVyY2hhbnRVc2VySWQiOiIyNTQzNjUyOjI3NzQ4NzM5MDgyNTg2NjAxODY6MSIsIm1vZGlmeVRpbWUiOiIxNzc0ODc2ODkxMDg2Iiwib2Rkc0NoYW5nZSI6MSwib3JkZXJTdGF0dXMiOjQsInBheVN0YXR1cyI6MSwicm9sbEJhY2tDb3VudCI6MCwic2VyaWVzVHlwZSI6MCwic2VyaWVzVmFsdWUiOjEsInN0YWtlQW1vdW50IjoiMTAiLCJ1bml0U3Rha2UiOiIxMCIsInVzZXJJZCI6IjI4ODU5NTEiLCJ2ZXJzaW9uIjo1LCJ3YWxsZXRUeXBlIjoyfSwKeyJhbGxVcCI6MSwiYWxsVXBBbGl2ZSI6MCwiYmV0TGlzdCI6W3siYmV0T2RkcyI6IjMuODIiLCJiZXRTY29yZSI6IlM6IDEtMCIsImV4dHJhSW5mbyI6IiIsImlkIjoiMTY5MjgxMTc3OTQ4ODM1MTAzOSIsImlzSW5wbGF5Ijp0cnVlLCJsZWFndWVQaGFzZSI6MCwibWFya2V0SWQiOiI5NjUwNTA3IiwibWFya2V0TmFtZSI6IueLrOi1oiIsIm1hcmtldFR5cGUiOjEwMDUsIm1hdGNoSWQiOiIxNDEwMjE3IiwibWF0Y2hOYW1lIjoiU2Fzc3VvbG8gQ2FsY2lvIHZzIEp1dmVudHVzIFR1cmluIiwibWF0Y2hUaW1lIjoiMTc2Nzk4NzkwMDAwMCIsIm1hdGNoVHlwZSI6Miwib2RkcyI6IjMuODIiLCJvZGRzRm9ybWF0IjoxLCJvcHRpb25OYW1lIjoiU2Fzc3VvbG8gQ2FsY2lvIiwib3B0aW9uVHlwZSI6MSwib3JkZXJJZCI6IjE2OTI4MTE3Nzk0ODgzNTA3ODMiLCJwZXJpb2QiOjEwMDEsInNldHRsZVJlc3VsdCI6NCwic2V0dGxlU3RhdHVzIjoxLCJzcG9ydElkIjoxLCJzcG9ydE5hbWUiOiLotrPnkIMiLCJ0b3VybmFtZW50SWQiOiIxMTAxOCIsInRvdXJuYW1lbnROYW1lIjoiSXRhbHkgU2VyaWUgQSJ9XSwiYmV0TnVtIjoxLCJiZXRUeXBlIjoiMXgxKjEiLCJjcmVhdGVUaW1lIjoiMTc3NDg3NzIyODYyMCIsImN1cnJlbmN5IjoiUEhQIiwiZGV2aWNlIjoiaDUiLCJlcCI6MCwiZXhjaGFuZ2VSYXRlIjoiMC4xMTM4NCIsImlkIjoiMTY5MjgxMTc3OTQ4ODM1MDc4MyIsImlwIjoiMTcyLjcxLjIxMS41NCIsIml0ZW1Db3VudCI6MSwibGlhYmlsaXR5U3Rha2UiOiIyNSIsImxvc2VBbW91bnQiOiI5NS41IiwibWF4U3Rha2UiOiI3NzAwMDAiLCJtYXhXaW5BbW91bnQiOiI3MC41IiwibW9kaWZ5VGltZSI6IjE3NzQ4NzcyMjg4NjUiLCJvZGRzQ2hhbmdlIjoxLCJvcGVyYXRvcklEIjoyNTQzNjUyLCJvcmRlclN0YXR1cyI6NSwicGF5U3RhdHVzIjo0LCJwbGF5ZXJJZCI6Mjc3NDg3MzkwODI1ODY2MDE4Niwicm9sbEJhY2tDb3VudCI6MCwic2VyaWVzVHlwZSI6MCwic2VyaWVzVmFsdWUiOjEsInNldHRsZUFtb3VudCI6Ijk1LjUiLCJzZXR0bGVUaW1lIjoiMTc3NTAwOTE1Mjg0NSIsInN0YWtlQW1vdW50IjoiMjUiLCJ0cmFuVHlwZSI6MSwidW5pdFN0YWtlIjoiMjUiLCJ1c2VySWQiOiIyODg1OTUxIiwidXNlck5hbWUiOiJ0ZXN0XzEyMzMyMTExMyIsInZhbGlkU2V0dGxlQW1vdW50IjoiOTUuNSIsInZhbGlkU2V0dGxlU3Rha2VBbW91bnQiOiIyNSIsInZlcnNpb24iOjUsIndhbGxldFR5cGUiOjJ9LAp7ImFsbFVwIjoxLCJhbGxVcEFsaXZlIjowLCJiZXRMaXN0IjpbeyJiZXRPZGRzIjoiMS45MSIsImJldFNjb3JlIjoiUzogMC0wIiwiZXh0ZW5kZWRQYXJhbWV0ZXIiOiItMS4yNSIsImV4dHJhSW5mbyI6IjAtMCIsImlkIjoiMTY5MjgxMTc3OTQ4ODM1MDUyNyIsImlzSW5wbGF5Ijp0cnVlLCJsZWFndWVQaGFzZSI6MTYsIm1hcmtldElkIjoiOTkwODQ1MCIsIm1hcmtldE5hbWUiOiLorqnnkIMiLCJtYXJrZXRUeXBlIjoxMDAwLCJtYXRjaElkIjoiMTQwNTA4NSIsIm1hdGNoTmFtZSI6Iua1t+WcsCB2cyDoi4/moLzlhbAiLCJtYXRjaFRpbWUiOiIxNzgxMzk4ODAwMDAwIiwibWF0Y2hUeXBlIjoyLCJvZGRzIjoiMS45MSIsIm9kZHNGb3JtYXQiOjEsIm9wdGlvbk5hbWUiOiLmtbflnLAgLTEvMS41Iiwib3B0aW9uVHlwZSI6MSwib3JkZXJJZCI6IjE2OTI4MTE3Nzk0ODgzNTAyNzEiLCJwMSI6LTEuMjUsInBlcmlvZCI6MTAwMSwic2V0dGxlUmVzdWx0Ijo0LCJzZXR0bGVTdGF0dXMiOjEsInNwb3J0SWQiOjEsInNwb3J0TmFtZSI6Iui2s+eQgyIsInRvdXJuYW1lbnRJZCI6IjEwNTgzIiwidG91cm5hbWVudE5hbWUiOiIyMDI25bm05Zu96ZmF6Laz6IGU5LiW55WM5p2v4oCMLUPnu4QifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4NzcyMjg2MTUiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI4MTE3Nzk0ODgzNTAyNzEiLCJpcCI6IjE3Mi43MS4yMTEuNTQiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiMTUiLCJsb3NlQW1vdW50IjoiMjguNjUiLCJtYXhTdGFrZSI6IjIxOTAwMDAiLCJtYXhXaW5BbW91bnQiOiIxMy42NSIsIm1vZGlmeVRpbWUiOiIxNzc0ODc3MjM5MDQ2Iiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjAxODYsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiIyOC42NSIsInNldHRsZVRpbWUiOiIxNzc0OTQ3NjQyMjM1Iiwic3Rha2VBbW91bnQiOiIxNSIsInRyYW5UeXBlIjoxLCJ1bml0U3Rha2UiOiIxNSIsInVzZXJJZCI6IjI4ODU5NTEiLCJ1c2VyTmFtZSI6InRlc3RfMTIzMzIxMTEzIiwidmFsaWRTZXR0bGVBbW91bnQiOiIyOC42NSIsInZhbGlkU2V0dGxlU3Rha2VBbW91bnQiOiIxNSIsInZlcnNpb24iOjYsIndhbGxldFR5cGUiOjJ9LAp7ImFsbFVwIjoxLCJhbGxVcEFsaXZlIjowLCJiZXRMaXN0IjpbeyJiZXRPZGRzIjoiMy44MiIsImJldFNjb3JlIjoiUzogMS0wIiwiZXh0cmFJbmZvIjoiIiwiaWQiOiIxNjkyODUwMzc0ODAyNjY5ODg3IiwiaXNJbnBsYXkiOnRydWUsImxlYWd1ZVBoYXNlIjowLCJtYXJrZXRJZCI6Ijk2NTA1MDciLCJtYXJrZXROYW1lIjoi54us6LWiIiwibWFya2V0VHlwZSI6MTAwNSwibWF0Y2hJZCI6IjE0MTAyMTciLCJtYXRjaE5hbWUiOiJTYXNzdW9sbyBDYWxjaW8gdnMgSnV2ZW50dXMgVHVyaW4iLCJtYXRjaFRpbWUiOiIxNzY3OTg3OTAwMDAwIiwibWF0Y2hUeXBlIjoyLCJvZGRzIjoiMy44MiIsIm9kZHNGb3JtYXQiOjEsIm9wdGlvbk5hbWUiOiJTYXNzdW9sbyBDYWxjaW8iLCJvcHRpb25UeXBlIjoxLCJvcmRlcklkIjoiMTY5Mjg1MDM3NDgwMjY2OTYzMSIsInBlcmlvZCI6MTAwMSwic2V0dGxlUmVzdWx0Ijo0LCJzZXR0bGVTdGF0dXMiOjEsInNwb3J0SWQiOjEsInNwb3J0TmFtZSI6Iui2s+eQgyIsInRvdXJuYW1lbnRJZCI6IjExMDE4IiwidG91cm5hbWVudE5hbWUiOiJJdGFseSBTZXJpZSBBIn1dLCJiZXROdW0iOjEsImJldFR5cGUiOiIxeDEqMSIsImNyZWF0ZVRpbWUiOiIxNzc0ODgxNzIxNjc2IiwiY3VycmVuY3kiOiJQSFAiLCJkZXZpY2UiOiJoNSIsImVwIjowLCJleGNoYW5nZVJhdGUiOiIwLjExMzg0IiwiaWQiOiIxNjkyODUwMzc0ODAyNjY5NjMxIiwiaXAiOiIxNjIuMTU4LjE3OC4xOTgiLCJpdGVtQ291bnQiOjEsImxpYWJpbGl0eVN0YWtlIjoiNSIsImxvc2VBbW91bnQiOiIxOS4xIiwibWF4U3Rha2UiOiI3NzAwMDAiLCJtYXhXaW5BbW91bnQiOiIxNC4xIiwibW9kaWZ5VGltZSI6IjE3NzQ4ODE3MjI2MDkiLCJvZGRzQ2hhbmdlIjoxLCJvcGVyYXRvcklEIjoyNTQzNjUyLCJvcmRlclN0YXR1cyI6NSwicGF5U3RhdHVzIjo0LCJwbGF5ZXJJZCI6Mjc3NDg3MzkwODI1ODY2MDE4Niwicm9sbEJhY2tDb3VudCI6MCwic2VyaWVzVHlwZSI6MCwic2VyaWVzVmFsdWUiOjEsInNldHRsZUFtb3VudCI6IjE5LjEiLCJzZXR0bGVUaW1lIjoiMTc3NTAwOTE1Mjg0NSIsInN0YWtlQW1vdW50IjoiNSIsInRyYW5UeXBlIjoxLCJ1bml0U3Rha2UiOiI1IiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6IjE5LjEiLCJ2YWxpZFNldHRsZVN0YWtlQW1vdW50IjoiNSIsInZlcnNpb24iOjUsIndhbGxldFR5cGUiOjJ9LAp7ImFsbFVwIjoxLCJhbGxVcEFsaXZlIjowLCJiZXRMaXN0IjpbeyJiZXRPZGRzIjoiMS42NCIsImJldFNjb3JlIjoiUzogMS0wIiwiZXh0ZW5kZWRQYXJhbWV0ZXIiOiIwLjI1IiwiZXh0cmFJbmZvIjoiIiwiaWQiOiIxNjkyODUyMTE3ODIxMTk0NTU5IiwiaXNJbnBsYXkiOnRydWUsImxlYWd1ZVBoYXNlIjowLCJtYXJrZXRJZCI6Ijk2NTA2NzAiLCJtYXJrZXROYW1lIjoi6K6p55CDIiwibWFya2V0VHlwZSI6MTAwMCwibWF0Y2hJZCI6IjE0MTAyMTciLCJtYXRjaE5hbWUiOiJTYXNzdW9sbyBDYWxjaW8gdnMgSnV2ZW50dXMgVHVyaW4iLCJtYXRjaFRpbWUiOiIxNzY3OTg3OTAwMDAwIiwibWF0Y2hUeXBlIjoyLCJvZGRzIjoiMS42NCIsIm9kZHNGb3JtYXQiOjEsIm9wdGlvbk5hbWUiOiJTYXNzdW9sbyBDYWxjaW8gKzAvMC41Iiwib3B0aW9uVHlwZSI6MSwib3JkZXJJZCI6IjE2OTI4NTIxMTc4MjExOTQzMDMiLCJwMSI6MC4yNSwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4ODE5MjQ3NDgiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI4NTIxMTc4MjExOTQzMDMiLCJpcCI6IjE2Mi4xNTguMTc4LjE5OCIsIml0ZW1Db3VudCI6MSwibGlhYmlsaXR5U3Rha2UiOiI1IiwibG9zZUFtb3VudCI6IjguMiIsIm1heFN0YWtlIjoiMjE5MDAwMCIsIm1heFdpbkFtb3VudCI6IjMuMiIsIm1vZGlmeVRpbWUiOiIxNzc0ODgxOTI0OTAzIiwib2Rkc0NoYW5nZSI6MSwib3BlcmF0b3JJRCI6MjU0MzY1Miwib3JkZXJTdGF0dXMiOjUsInBheVN0YXR1cyI6NCwicGxheWVySWQiOjI3NzQ4NzM5MDgyNTg2NjAxODYsInJvbGxCYWNrQ291bnQiOjAsInNlcmllc1R5cGUiOjAsInNlcmllc1ZhbHVlIjoxLCJzZXR0bGVBbW91bnQiOiI4LjIiLCJzZXR0bGVUaW1lIjoiMTc3NDk0MzQ3Mjk2OSIsInN0YWtlQW1vdW50IjoiNSIsInRyYW5UeXBlIjoxLCJ1bml0U3Rha2UiOiI1IiwidXNlcklkIjoiMjg4NTk1MSIsInVzZXJOYW1lIjoidGVzdF8xMjMzMjExMTMiLCJ2YWxpZFNldHRsZUFtb3VudCI6IjguMiIsInZhbGlkU2V0dGxlU3Rha2VBbW91bnQiOiI1IiwidmVyc2lvbiI6NSwid2FsbGV0VHlwZSI6Mn0sCnsiYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTI4NTMxNDA3NjE2MDg1MTEiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkyODUzMTQwNzYxNjA4MjU1IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ4ODIwNDMzNDIiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTI4NTMxNDA3NjE2MDgyNTUiLCJpcCI6IjE2Mi4xNTguMTc4LjE5OCIsIml0ZW1Db3VudCI6MSwibGlhYmlsaXR5U3Rha2UiOiI1IiwibG9zZUFtb3VudCI6IjE5LjEiLCJtYXhTdGFrZSI6Ijc3MDAwMCIsIm1heFdpbkFtb3VudCI6IjE0LjEiLCJtb2RpZnlUaW1lIjoiMTc3NDg4MjA0MzU3NSIsIm9kZHNDaGFuZ2UiOjEsIm9wZXJhdG9ySUQiOjI1NDM2NTIsIm9yZGVyU3RhdHVzIjo1LCJwYXlTdGF0dXMiOjQsInBsYXllcklkIjoyNzc0ODczOTA4MjU4NjYwMTg2LCJyb2xsQmFja0NvdW50IjowLCJzZXJpZXNUeXBlIjowLCJzZXJpZXNWYWx1ZSI6MSwic2V0dGxlQW1vdW50IjoiMTkuMSIsInNldHRsZVRpbWUiOiIxNzc1MDA5MTUyODQ1Iiwic3Rha2VBbW91bnQiOiI1IiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjUiLCJ1c2VySWQiOiIyODg1OTUxIiwidXNlck5hbWUiOiJ0ZXN0XzEyMzMyMTExMyIsInZhbGlkU2V0dGxlQW1vdW50IjoiMTkuMSIsInZhbGlkU2V0dGxlU3Rha2VBbW91bnQiOiI1IiwidmVyc2lvbiI6NSwid2FsbGV0VHlwZSI6Mn0sCnsiYWxsVXAiOjEsImFsbFVwQWxpdmUiOjAsImJldExpc3QiOlt7ImJldE9kZHMiOiIzLjgyIiwiYmV0U2NvcmUiOiJTOiAxLTAiLCJleHRyYUluZm8iOiIiLCJpZCI6IjE2OTMyNDAyNzExOTU2MDMyNjMiLCJpc0lucGxheSI6dHJ1ZSwibGVhZ3VlUGhhc2UiOjAsIm1hcmtldElkIjoiOTY1MDUwNyIsIm1hcmtldE5hbWUiOiLni6zotaIiLCJtYXJrZXRUeXBlIjoxMDA1LCJtYXRjaElkIjoiMTQxMDIxNyIsIm1hdGNoTmFtZSI6IlNhc3N1b2xvIENhbGNpbyB2cyBKdXZlbnR1cyBUdXJpbiIsIm1hdGNoVGltZSI6IjE3Njc5ODc5MDAwMDAiLCJtYXRjaFR5cGUiOjIsIm9kZHMiOiIzLjgyIiwib2Rkc0Zvcm1hdCI6MSwib3B0aW9uTmFtZSI6IlNhc3N1b2xvIENhbGNpbyIsIm9wdGlvblR5cGUiOjEsIm9yZGVySWQiOiIxNjkzMjQwMjcxMTk1NjAzMDA3IiwicGVyaW9kIjoxMDAxLCJzZXR0bGVSZXN1bHQiOjQsInNldHRsZVN0YXR1cyI6MSwic3BvcnRJZCI6MSwic3BvcnROYW1lIjoi6Laz55CDIiwidG91cm5hbWVudElkIjoiMTEwMTgiLCJ0b3VybmFtZW50TmFtZSI6Ikl0YWx5IFNlcmllIEEifV0sImJldE51bSI6MSwiYmV0VHlwZSI6IjF4MSoxIiwiY3JlYXRlVGltZSI6IjE3NzQ5MjcxMTEzMTYiLCJjdXJyZW5jeSI6IlBIUCIsImRldmljZSI6Img1IiwiZXAiOjAsImV4Y2hhbmdlUmF0ZSI6IjAuMTEzODQiLCJpZCI6IjE2OTMyNDAyNzExOTU2MDMwMDciLCJpcCI6IjE2Mi4xNTguMTkzLjExNSIsIml0ZW1Db3VudCI6MSwibGlhYmlsaXR5U3Rha2UiOiI1IiwibG9zZUFtb3VudCI6IjE5LjEiLCJtYXhTdGFrZSI6Ijc3MDAwMCIsIm1heFdpbkFtb3VudCI6IjE0LjEiLCJtb2RpZnlUaW1lIjoiMTc3NDkyNzExMTY3MyIsIm9kZHNDaGFuZ2UiOjEsIm9wZXJhdG9ySUQiOjI1NDM2NTIsIm9yZGVyU3RhdHVzIjo1LCJwYXlTdGF0dXMiOjQsInBsYXllcklkIjoyNzc0ODczOTA4MjU4NjYwMTg2LCJyb2xsQmFja0NvdW50IjowLCJzZXJpZXNUeXBlIjowLCJzZXJpZXNWYWx1ZSI6MSwic2V0dGxlQW1vdW50IjoiMTkuMSIsInNldHRsZVRpbWUiOiIxNzc1MDA5MTUyODQ1Iiwic3Rha2VBbW91bnQiOiI1IiwidHJhblR5cGUiOjEsInVuaXRTdGFrZSI6IjUiLCJ1c2VySWQiOiIyODg1OTUxIiwidXNlck5hbWUiOiJ0ZXN0XzEyMzMyMTExMyIsInZhbGlkU2V0dGxlQW1vdW50IjoiMTkuMSIsInZhbGlkU2V0dGxlU3Rha2VBbW91bnQiOiI1IiwidmVyc2lvbiI6NSwid2FsbGV0VHlwZSI6Mn1d
```

------

## 页面行为

- 页面加载后自动读取 `#content`
- 解析 Base64 数据并转换为 JSON
- 渲染订单表格展示

## 注意事项

- `content` 必须为合法 Base64 字符串
- 数据需为 JSON 格式，否则无法解析
- 建议进行 URL 编码以避免特殊字符问题
- 页面仅解析 `#content` 参数
- 数据过大可能导致浏览器无法正常打开

## 说明

- 所有数据仅在前端解析，不经过服务端
- 适用于订单展示、调试、对账等场景

------
<br><br><br><br><br>

# 常见问题说明

## 页面数据不一致

**问：为什么页面看到的数据不一致，菜单内容不一致？**

答1：
 页面数据会根据用户所在时区进行展示，不同时区下的数据（如时间、赛事状态、菜单列表等）可能存在差异，因此会出现显示不一致的情况。

答2：
 游客用户和登入用户看到的数据可能存在差异。
<br>

## 赔率浮动不一致

**问：为什么不同用户看到的赔率浮动不一样？**

答：
 系统会根据用户等级对赔率进行差异化调整，不同等级对应不同的浮动范围。

**等级说明：**
- A级别：不进行赔率调整
- B级别：浮动范围 ±0.01（总幅度 0.02，默认等级）
- C级别：浮动范围 ±0.02（总幅度 0.04）
- D级别：浮动范围 ±0.03（总幅度 0.06）
- E级别：浮动范围 ±0.05（总幅度 0.10）
- F级别：浮动范围 ±0.10（总幅度 0.20）
- G级别：浮动范围 ±0.15（总幅度 0.30）


**说明：**
- 浮动范围为在基础赔率上的上下调整区间
- 用户等级越高，赔率浮动范围越大
- 默认用户等级为 B级别