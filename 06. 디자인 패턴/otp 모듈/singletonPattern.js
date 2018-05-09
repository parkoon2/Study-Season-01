var singletonModule = (function(){
	function singleton(name){
		this.name = name;
	}

	var obj;

	return {
		getInstance : function(name){
			if(obj === undefined){
				obj = new singleton(name);
			}
			return obj;
		}
	};

})();
var singletonModuletest = singletonModule.getInstance("kim");
alert(singletonModuletest.name);