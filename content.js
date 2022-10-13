(
    function(){
        console.log("content.js @ ", new Date());
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = 0;
        div.style.right = 0;
        div.width = 100;
        div.height = 100;
        div.zIndex = 1000;
        div.textContent = 'Injected!';
        document.body.appendChild(div);
	    alert('inserted self... giggity');
    }
)();

