document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Mie Goreng Barbeque", img: "1.jpg", price: 4500 },
      { id: 2, name: "Mie Goreng Hot & Spicy", img: "2.jpg", price: 3500 },
      { id: 3, name: "Mie Goreng Rendang", img: "3.jpg", price: 3500 },
      { id: 4, name: "Mie Goreng Satay", img: "4.jpg", price: 3500 },
      { id: 5, name: "Mie Goreng", img: "5.jpg", price: 4000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yg sejenis di cart

      const cartItem = this.items.find((item) => item.id == newItem.id);

      //jika belum ada atau cart masih kosong

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price }); //untuk memasukkan new items ke array
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada yg sejenis, cek apakah beda atau sama

        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item; //fungsi rekursif
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      // ambil item yg mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id == id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1, 1
        this.items = this.items.map((item) => {
          //jika bukan barang yg diklik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1, untuk menghapus atau membuat ke 0
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke Rupiah

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // untuk menghilangkan ,00
  }).format(number);
};
