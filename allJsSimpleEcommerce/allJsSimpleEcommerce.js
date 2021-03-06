const body = document.querySelector('body')
let toggleState = false
const stock = [{name: 'prod_1',price:100},{name:'prod_2',price:200}]
const cart  =[]
const container = document.createElement('div')
container.setAttribute('id','container')
container.style = 'display: flex;justify-content: space-around'


function createHeader(){
    const header = document.createElement('header')
    header.setAttribute('id','allJsHeader')

    const title = document.createElement('h1')
    title.innerHTML = 'All .Js Simple Ecommerce'

    const a = document.createElement('a')
    a.innerHTML = 'Home'
    a.setAttribute('href','../index.html')

    header.appendChild(title)
    header.appendChild(a)
    body.appendChild(header)
}
createHeader()
body.appendChild(container)


function toggleButton(){
const toggleViewButton = document.createElement('button')
toggleViewButton.setAttribute('id','toggleViewButton')
toggleViewButton.innerHTML = 'Add Products'
const header = document.querySelector('#allJsHeader')
header.appendChild(toggleViewButton)
toggleViewButton.addEventListener('click',toggleView)
}
toggleButton()

function alertFunction(){
    alert('works')
}

//toggle function between list and add product

function toggleView(){
    const button = document.querySelector('#toggleViewButton')
    toggleState = !toggleState
    if(toggleState){
        button.innerHTML = 'see all products'
        const list = document.querySelector('#stockListDiv')
        const cartDiv = document.querySelector('#cartDiv')
        container.removeChild(list)
        if(cartDiv){
            container.removeChild(cartDiv)
        }
        createAddForm()
    }else{
        button.innerHTML = 'Add Products'
        const form = document.querySelector('#addForm')
        container.removeChild(form)
        createProdList()
        createCart()
    }
    
}

function createProdList(){
    const stockListDiv = document.createElement('div')
    stockListDiv.setAttribute('id','stockListDiv')
    stockListDiv.style.backgroundColor = 'green'
    stockListDiv.style.width = '500px'
    stockListDiv.style.height = '500px'
    stockListDiv.innerHTML = 'this is the stock list'

    const stockListUl = document.createElement('ul')
    stock.forEach((item)=>{
        
        const product = document.createElement('li')
        product.innerHTML = `${item.name}: $${item.price}`
        product.setAttribute('id',item.name)

        const addCart = document.createElement('button')
        addCart.innerHTML = 'add to cart'
        addCart.addEventListener('click',addToCart)

        product.appendChild(addCart)
        stockListUl.appendChild(product)
    })

    stockListDiv.appendChild(stockListUl)
    container.appendChild(stockListDiv)

}
createProdList()

function addToCart(ev){
    stock.forEach(item=>{
        
        if(item.name === ev.target.parentElement.id){
            cart.push(item)
            createCart()
        }
        
    })
}

function createAddForm(){
    const addForm = document.createElement('form')
    addForm.setAttribute('id','addForm')
    addForm.onsubmit = handleSubmit

    const inputName = document.createElement('input')
    inputName.setAttribute('id','inputName')
    inputName.type = 'text'
    inputName.placeholder = 'add a product name'

    const inputPrice = document.createElement('input')
    inputPrice.setAttribute('id','inputPrice')
    inputPrice.type = 'text'
    inputPrice.placeholder = 'add a product price'

    const submitProduct = document.createElement('button')
    submitProduct.setAttribute('id','submitProduct')
    submitProduct.type = 'submit'
    submitProduct.innerHTML = 'add product'

    addForm.appendChild(inputName)
    addForm.appendChild(inputPrice)
    addForm.appendChild(submitProduct)
    container.appendChild(addForm)
}

function handleSubmit(ev){
    ev.preventDefault()
    stock.push(
        {
            name:ev.target.inputName.value,
            price:parseInt(ev.target.inputPrice.value)
        }
    )
    const inputName = document.querySelector('#inputName')
    inputName.value = ''
    const inputPrice = document.querySelector('#inputPrice')
    inputPrice.value = ''
    alert('added')
}

function createCart(){
    const prevCart = document.querySelector('#cartDiv')
    if(prevCart){
        container.removeChild(prevCart)
    }

    let total = 0

    const cartDiv = document.createElement('div')
    cartDiv.setAttribute('id','cartDiv')
    cartDiv.style.backgroundColor = 'grey'

    const cartList = document.createElement('ul')
    cartList.setAttribute('id','cartList')
    
    cart.forEach(item=>{
        const product = document.createElement('li')
        product.setAttribute('id',item.name)
        product.innerHTML = `${item.name}: $${item.price}`
        cartList.appendChild(product)
        total+=item.price

        const remove = document.createElement('button')
        remove.innerHTML = 'remove'
        remove.addEventListener('click',(ev)=>{
            
            let selected = cart.find(item=>{
            
                return item.name === ev.target.parentElement.id
            })
            const selectIndex = cart.indexOf(selected)
            cart.splice(selectIndex,1)
            
            createCart()
        })
        product.appendChild(remove)
    })

    const totalP = document.createElement('p')
    totalP.innerHTML = `Total: ${total}`
    

    
    cartDiv.appendChild(cartList)
    cartDiv.appendChild(totalP)
    container.appendChild(cartDiv)
}

