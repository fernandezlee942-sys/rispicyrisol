import mayoImg from '../assets/mayo.jpg'
import ragoutImg from '../assets/ragout.jpg'
import cheeseImg from '../assets/cheese.jpg'

/* >>> GANTI nomor WhatsApp toko kamu di sini (format: kode negara + nomor, tanpa +) */
export const WA_NUMBER = '6281234567890'

export const formatIDR = (n) => 'Rp' + n.toLocaleString('id-ID')

/* Produk dengan foto = menu andalan. Produk tanpa foto tampil di daftar varian. */
export const products = [
  {
    id: 'mayo',
    name: 'Risol Mayo Smoked Beef',
    desc: 'Mayo creamy, telur, dan smoked beef. Best seller sejak hari pertama — sekali gigit langsung lumer.',
    price: 6000,
    img: mayoImg,
    tag: 'Best Seller',
    category: 'gurih',
    rating: '4.9',
  },
  {
    id: 'ragout',
    name: 'Risol Ragout Ayam',
    desc: 'Ragout ayam creamy dengan wortel dan susu, resep klasik yang gurihnya nagih dan nggak pelit isi.',
    price: 5500,
    img: ragoutImg,
    tag: 'Klasik',
    category: 'gurih',
    rating: '4.8',
  },
  {
    id: 'cheese',
    name: 'Risol Smoked Beef Cheese',
    desc: 'Smoked beef plus mozzarella yang molor parah pas ditarik. Favorit anak muda, stoknya paling cepat habis.',
    price: 7000,
    img: cheeseImg,
    tag: 'Paling Laris',
    category: 'gurih',
    rating: '5.0',
  },
  {
    id: 'mercon',
    name: 'Risol Mercon',
    desc: 'Isi ayam suwir pedas nampol pakai cabai rawit asli. Kecil-kecil cabai rawit — literally.',
    price: 6000,
    img: null,
    tag: 'Pedas',
    category: 'pedas',
    rating: '4.8',
  },
  {
    id: 'coklat',
    name: 'Risol Pisang Coklat Lumer',
    desc: 'Pisang raja dan coklat yang meleleh di mulut. Varian manis buat yang mau risol jadi dessert.',
    price: 5500,
    img: null,
    tag: 'Manis',
    category: 'manis',
    rating: '4.9',
  },
  {
    id: 'sayur',
    name: 'Risol Sayur Bihun',
    desc: 'Bihun, wortel, dan sayuran segar dengan bumbu bawang putih. Ringan, gurih, ramah di kantong.',
    price: 4000,
    img: null,
    tag: 'Hemat',
    category: 'gurih',
    rating: '4.7',
  },
]

export const testimonials = [
  {
    name: ' Nadia P.',
    role: 'Pelanggan tetap — Jakarta',
    text: 'Mayo-nya juara! Kulitnya renyah banget, nggak berminyak. Udah langganan tiap Jumat buat kantor.',
    stars: 5,
  },
  {
    name: 'Farhan A.',
    role: 'Order buat acara kampus',
    text: 'Pesan 150 pcs buat acara, datang masih hangat dan rapi. Yang cheese molor banget, langsung habis duluan.',
    stars: 5,
  },
  {
    name: 'Citra M.',
    role: 'Ibu rumah tangga',
    text: 'Frozen pack-nya praktis banget buat stok di rumah. Tinggal goreng 5 menit, anak-anak doyan semua.',
    stars: 5,
  },
]
