/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import config from "config.js"

export default {
  async fetch(request, env, ctx) {
    
    const _url = new URL(request.url);
    _url.pathname = _url.pathname.replace(/\/{2,}/g, '/'); // 替换多余 //
    
    const baseHost = _url.hostname;
    let baseHostVec = baseHost.split(".");
    let firstHostName = baseHostVec[0];
    if(config.firstHostNameMap[firstHostName]==null){
      return fetch(new Request(_url, request));  
    }

    let res =  fetch(new Request(_url, request));
    let resData = await res;
    // console.log("==============resData.status",resData.status);
    if(resData.status==404){
      for(;true;){
        let srcUrl = request.url;
        if(srcUrl.indexOf("?")>0){
          srcUrl = srcUrl.substring(0, srcUrl.indexOf("?"));
        }
        let srcUrlKey = "notfound:file:"+srcUrl;
        let lastReqTime = await env.KV.get(srcUrlKey);

        if(Date.now()-lastReqTime<10*1000){
          console.log("等待下载中");
          break;
        }
        env.KV.put(srcUrlKey, Date.now());
        //开始下载文件存储到r2
        console.log(_url.pathname);
        let pathName = _url.pathname;
        if(pathName.indexOf("?")>0){
          pathName = pathName.substring(0, pathName.indexOf("?"));
        }
        pathName = pathName.substring(1);
        
        let existList = await env[firstHostName].list({
          prefix:pathName
        })
        if(existList.objects==null || existList.objects.length>0){
          console.log("文件已存在，不需要下载");
          break;
        }

        let targetHosts = config.firstHostNameMap[firstHostName].targetHosts;
        for(let i=0;i<targetHosts.length;i++){
          _url.hostname = targetHosts[i];
          if(_url.pathname.indexOf("/shared")==0){
            let tmpPathName = _url.pathname.replace("/shared", "");
            _url.pathname = "/shared"+ tmpPathName.substring(tmpPathName.indexOf("/"));
          }
          let srcData = await fetch(_url);
          if(!srcData.ok || srcData.status!=200){
            console.log("文件请求失败");
            continue;
          }
          let srcArray = await srcData.arrayBuffer();
          if(srcArray==null){
            console.log("文件下载失败");
            continue;
          }
          
          let saveRes = await env[firstHostName].put(pathName, srcArray);
          console.log("saveRes", saveRes);
          break;
        }
        break;
      }
    }
    caches.default.delete(request.url);
    return resData;
  }
}

