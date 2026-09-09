const products = [
  {id:1,name:"Base Glow Natural",category:"Rostro",price:52000,bg:"rose-bg",type:""},
  {id:2,name:"Blush Soft Rose",category:"Rostro",price:38000,bg:"pink-bg",type:"pot"},
  {id:3,name:"Lip Oil Nude",category:"Labios",price:32000,bg:"nude-bg",type:"tube"},
  {id:4,name:"Velvet Lip",category:"Labios",price:35000,bg:"rose-bg",type:"tube"},
  {id:5,name:"Mascara Intense",category:"Ojos",price:41000,bg:"dark-bg",type:""},
  {id:6,name:"Glow Highlighter",category:"Rostro",price:45000,bg:"nude-bg",type:"pot"},
  {id:7,name:"Eye Shadow Nude",category:"Ojos",price:47000,bg:"pink-bg",type:"pot"},
  {id:8,name:"Brow Define",category:"Ojos",price:29000,bg:"dark-bg",type:"tube"}
];

let cart = [];

function money(value){
  return new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(value);
}

function renderProducts(list=products){
  const grid=document.getElementById("productGrid");
  grid.innerHTML=list.map(p=>`
    <div class="col-12 col-sm-6 col-lg-3">
      <article class="product-card">
        <div class="product-image ${p.bg}">
          <div class="product-pack ${p.type}">LUMÉ</div>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p>${p.category} · Beauty collection</p>
          <span class="price">${money(p.price)}</span>
          <button class="add-btn" onclick="addToCart(${p.id})" aria-label="Agregar ${p.name}">+</button>
        </div>
      </article>
    </div>
  `).join("");
}

function filterProducts(category,btn){
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(category==="all"?products:products.filter(p=>p.category===category));
}

function addToCart(id){
  const product=products.find(p=>p.id===id);
  cart.push(product);
  document.getElementById("cartCount").textContent=cart.length;
  showMessage(`${product.name} fue agregado a tu bolsa.`);
}

function openCart(){
  const body=document.getElementById("cartBody");
  if(!cart.length){
    body.innerHTML="Tu bolsa está vacía.";
  }else{
    body.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><strong>${money(p.price)}</strong></div>`).join("");
  }
  document.getElementById("cartTotal").textContent=money(cart.reduce((sum,p)=>sum+p.price,0));
  new bootstrap.Modal(document.getElementById("cartModal")).show();
}

function checkout(){
  if(!cart.length){showMessage("Agrega un producto primero.");return;}
  showMessage("Demo académica: compra simulada correctamente.");
  cart=[];
  document.getElementById("cartCount").textContent=0;
  bootstrap.Modal.getInstance(document.getElementById("cartModal"))?.hide();
}

function sendForm(e){
  e.preventDefault();
  showMessage(`Gracias, ${document.getElementById("name").value}. Tu mensaje fue enviado.`);
  e.target.reset();
}

function showMessage(text){
  const toast=document.getElementById("toast");
  toast.textContent=text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);
}

renderProducts();
