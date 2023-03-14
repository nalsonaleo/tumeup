 const msg = (title, duration=1500, mask=false, icon='none')=>{
  	//统一提示方便全局修改
  	if(Boolean(title) === false){
  		return;
  	}
  	uni.showToast({
  		title,
  		duration,
  		mask,
  		icon
  	});
  }
  
 const getQueryVariable = (key, url) => {
         var query = url.split('?')[1];
         var vars = query.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == key){return pair[1];}
         }
         return(false);
  }
export default {
  msg,
  getQueryVariable
}