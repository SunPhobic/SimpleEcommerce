(function(){
    const ecommerce = {

        stock:[{name:'prod1',price:100},{name:'prod2',price:200},{name:'prod3',price:300}],
        cart:[],

        init: function(){
            this.cacheDOM();
            this.bindings();
            this.populateList(this.stock,this.stockUl)
        },

        cacheDOM: function(){
            this.body = document.querySelector('body')
            this.header = document.querySelector('header')
            this.title = document.querySelector('#title')
            this.mainStockList = document.querySelector('#mainStockList')
            this.stockUl = document.querySelector('#stockUl')
            this.addStockForm = document.querySelector('#addStockForm')
            this.nameInput = document.querySelector('#nameInput')
            this.priceInput = document.querySelector('#priceInput')
            this.submitButton = document.querySelector('#submitButton')
            this.cartUl = document.querySelector('#cartUl')
        },

        bindings: function(){
            this.submitButton.addEventListener('click',this.handleSubmit.bind(this))
        },

        populateList: function(source,target){
            source.forEach(item=>{
                const product = document.createElement('li')
                product.innerHTML = `${item.name}: $${item.price}`

                if(target === this.stockUl){
                    product.setAttribute('id',item.name)
                    const addCartButton = document.createElement('button')
                    addCartButton.innerHTML = 'Add Product'
                    addCartButton.addEventListener('click',this.addCart.bind(this))
                    product.appendChild(addCartButton)
                }
            
                if(target === this.cartUl){
                    product.setAttribute('id',`${item.name}_cart`)
                    const removeCartButton = document.createElement('button')
                    removeCartButton.innerHTML = 'Delete Product'
                    removeCartButton.addEventListener('click',this.removeCart.bind(this))
                    product.appendChild(removeCartButton)
                }

                target.appendChild(product)
            })
        },
        
        handleSubmit: function(ev){
            ev.preventDefault()
            this.stock.push(
                {
                    name:ev.target.parentElement.nameInput.value,
                    price:parseFloat(ev.target.parentElement.priceInput.value)
                }
            )
            this.stockUl.innerHTML = ''
            this.populateList(this.stock,this.stockUl)
        },

        addCart: function(ev){
            this.stock.forEach(item=>{
                if(item.name === ev.target.parentElement.id){
                    this.cart.push(item)
                }
            })
            this.cartUl.innerHTML = ''
            this.populateList(this.cart,this.cartUl)
        },

        removeCart: function(ev){
            const idArr = ev.target.parentElement.id.split('_')
            const id = idArr[0]

            const findObject = this.cart.find(item=>{
                return item.name === id
            })
            const index = this.cart.indexOf(findObject)
            this.cart.splice(index,1)

            this.cartUl.innerHTML = ''
            this.populateList(this.cart,this.cartUl)
        },

        test:function(ev){
            ev.preventDefault()
            console.log(this)
            console.log('test successful')
        }
    }
    ecommerce.init()
})()