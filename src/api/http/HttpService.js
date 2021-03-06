import config from '../../config'

export class HttpService {

  /**
   * http post.
   * @param {*} succ 成功回應的function
   * @param {*} fail 失敗回應的function
   * @param {*} methodUri 資源uri
   */
  static httpPost(params, succ, fail, methodUri) {
    let body = convertBody(params)
    console.debug('post body,,, ', body)
    fetch(config.endpoint + methodUri, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Credentials': 'true'
        }),
        body: body
      })
      .then((response) => {
        console.log('response :', response);
        //ok 代表狀態碼在範圍 200-299
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then((json) => {
        if (json.status.errorCode && json.status.errorCode === '0000') {
          succ(json)
        } else {
          throw new Error(json.msg)
        }
      })
      .catch((error) => {
        //這裡可以顯示一些訊息
        console.error(error)
        fail(error)
      })
  }
  /**
   * http get.
   * @param {*} succ 
   * @param {*} fail 
   * @param {*} uri 
   */
  static httpGet(succ, fail, uri) {
    fetch(config.endpoint + uri, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        }),
      })
      .then((response) => {
        //ok 代表狀態碼在範圍 200-299
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
      })
      .then((json) => {
        console.log('response :', json)
        if (json.code && json.code === '0000') {
          succ(json)
        } else {
          throw new Error(json.msg)
        }
      })
      .catch((error) => {
        //這裡可以顯示一些訊息
        console.error(error)
        fail(error)
      })

  }

}
/**
 * 共用驗證參數.
 */
const commonParams = {};



/**
 * 將傳入參數轉換成json body.
 * @param {*} params 參數
 */
function convertBody(params) {
  return JSON.stringify(Object.assign({}, params, commonParams));
}