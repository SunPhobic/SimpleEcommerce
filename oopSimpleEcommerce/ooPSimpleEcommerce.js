(function(){
    const ecommerce = {

        stock:[{name:'prod1',price:100},{name:'prod2',price:200},{name:'prod3',price:300}],
        cart:[],

        init: function(){
            this.cacheDOM();
            this.bindings();
            this.populateList(this.stock,this.mainStockList)
        },

        cacheDOM: function(){
            this.header = document.querySelector('header')
            this.title = document.querySelector('#title')
            this.mainStockList = document.querySelector('#mainStockList')
            this.stockUl = document.querySelector('#stockUl')
            this.addStockForm = document.querySelector('#addStockForm')
            this.nameInput = document.querySelector('#nameInput')
            this.priceInput = document.querySelector('#priceInput')
            this.submitButton = document.querySelector('#submitButton')
        },

        bindings: function(){
            this.submitButton.addEventListener('click',this.test.bind(this))
        },

        populateList: function(source,target){
            source.forEach(item=>{
                const product = document.createElement('li')
                product.innerHTML = `${item.name}: $${item.price}`
                target.appendChild(product)
            })
        },

        test:function(ev){
            ev.preventDefault()
            console.log(this)
            console.log('test successful')
        }
    }
    ecommerce.init()
})()