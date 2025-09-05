const { createApp } = Vue;

createApp({
  data(){
    return {
      user: "",
      page: "home",
      // Меню (можно расширять)
      menu: [
        {
          id: "espresso",
          name: "Еспресо",
          price: 35,
          desc: "Концентрований постріл енергії з чистим смаковим профілем.",
          img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop"
        },
        {
          id: "americano",
          name: "Американо",
          price: 40,
          desc: "М'якший, довший eспресо: збалансований та питкий.",
          img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop"
        },
        {
          id: "cappuccino",
          name: "Капучино",
          price: 50,
          desc: "Еспресо, молоко та оксамитова пінка — золотий стандарт.",
          img: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=1200&auto=format&fit=crop"
        },
        {
          id: "latte",
          name: "Лате",
          price: 55,
          desc: "Ніжний молочний кавовий десерт для довгих розмов.",
          img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1200&auto=format&fit=crop"
        }
      ],
      selectedCoffeeId: "",
      size: "m",              // s / m / l
      addons: [],             // vanilla, caramel, oatmilk
      count: 1,
      message: ""
    };
  },
  computed:{
    currentItem(){
      return this.menu.find(m => m.id === this.selectedCoffeeId) || null;
    },
    sizeMultiplier(){
      return this.size === "s" ? 1.0 : this.size === "m" ? 1.25 : 1.5;
    },
    addonsCost(){
      let total = 0;
      if(this.addons.includes("vanilla")) total += 8;
      if(this.addons.includes("caramel")) total += 8;
      if(this.addons.includes("oatmilk")) total += 10;
      return total;
    },
    totalPrice(){
      if(!this.currentItem) return 0;
      const base = this.currentItem.price * this.sizeMultiplier;
      const oneCup = Math.round(base) + this.addonsCost;
      return oneCup * Math.max(1, this.count);
    },
    addonsLabel(){
      if(!this.addons.length) return "без додатків";
      return this.addons.map(a => ({
        vanilla: "ваніль",
        caramel: "карамель",
        oatmilk: "вівсяне молоко"
      }[a])).join(", ");
    }
  },
  mounted(){
    const saved = localStorage.getItem("user");
    if(saved) this.user = saved;
  },
  methods:{
    logoutUser(){
      localStorage.removeItem("user");
    },
    quickPick(item){
      this.selectedCoffeeId = item.id;
      this.page = "order";
    },
    confirmOrder(){
      if(!this.currentItem || this.count < 1) return;
      this.message = `Дякуємо, ${this.user || "гість"}! Ви замовили «${this.currentItem.name}» (${this.size.toUpperCase()}) ` +
                     `× ${this.count} ${this.addons.length ? "з додатками: " + this.addonsLabel : "без додатків"} ` +
                     `на суму ${this.totalPrice} грн. Смачного!`;
      // Легка «очистка» форми (не повна, щоб користувачу було зручно повторити)
      setTimeout(() => this.message = "", 7000);
    }
  }
}).mount("#app");
