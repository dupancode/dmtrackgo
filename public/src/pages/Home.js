export default {
  template: `
        <div class="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow">
          <h1 class="text-3xl font-bold mb-1 text-gray-800">DM Track Go!</h1>
          <img class="block mx-auto" src="https://i.imghippo.com/files/YzWc9624hvY.jpg" />
          <p class="text-gray-500 text-sm text-center mb-1">Lacak paketmu kapan saja, di mana saja!</p>
          
          <div class="relative">
            <div @click="toggleDropdown" class="flex justify-between items-center px-4 py-2 rounded-md cursor-pointer w-full bg-white border border-gray-300">
              <span>{{ selectedCourier?.name || 'Cari Kurir' }}</span>
              <svg class="w-4 h-4 ml-2 transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div v-if="dropdownOpen" class="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg p-2">
              <input v-model="search" @blur="closeDropdown" placeholder="Ketik nama kurir..." class="w-full px-4 py-2 border border-gray-300 rounded-md mb-2" />
              <ul class="max-h-48 overflow-auto">
                <li v-for="courier in filteredCouriers" :key="courier.code" @mousedown.prevent="selectCourier(courier)" class="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded">
                  {{ courier.name }}
                </li>
                <li v-if="!filteredCouriers.length" class="text-gray-500 px-4 py-2">Tidak ditemukan</li>
              </ul>
            </div>
          </div>
          
          <input v-model="resi" placeholder="Ketik nomor resi..." class="my-8 w-full px-4 py-2 border border-gray-300 rounded-md mb-2" />
          
          <button class="block my-8 mx-auto px-4 py-2 rounded-md text-white flex items-center justify-center gap-2" :class="loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'" @click="check" :disabled="loading">
            <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span>{{ loading ? 'Memuat...' : 'Cek Paket' }}</span>
          </button>
          
          <section v-if="receiptResults.summary" class="mt-6">
            
            <table class="w-full text-sm mb-4 table-auto border border-gray-200 rounded overflow-x-scroll">
              <thead>
                <tr>
                  <th colspan="2" class="p-0">
                    <div class="flex justify-between items-center p-3 bg-blue-500 w-full border">
                      <h2 class="text-lg font-semibold text-white">Status Pengiriman</h2>
                      <button @click="copyURL" class="ml-2 text-white" title="Salin URL">
                        <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z" fill="#ffffff"></path>
                        </svg>
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-gray-50">
                  <td class="p-2 font-medium border">Resi</td>
                  <td class="p-2 border">{{ receiptResults.summary.awb }}</td>
                </tr>
                <tr>
                  <td class="p-2 font-medium border">Kurir</td>
                  <td class="p-2 border">{{ receiptResults.summary.courier }}</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="p-2 font-medium border">Status</td>
                  <td class="p-2 border">{{ receiptResults.summary.status }}</td>
                </tr>
                <tr>
                  <td class="p-2 font-medium border">Pengirim</td>
                  <td class="p-2 border">{{ receiptResults.detail.shipper }}</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="p-2 font-medium border">Penerima</td>
                  <td class="p-2 border">{{ receiptResults.detail.receiver }}</td>
                </tr>
                <tr>
                  <td class="p-2 font-medium border">Tanggal</td>
                  <td class="p-2 border">{{ receiptResults.summary.date }}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="relative border-l-2 border-blue-500 ml-2 pl-4">
              <div v-for="(item, index) in receiptResults.history" :key="index" class="mb-6">
                <div class="absolute -left-[9px] bg-blue-500 rounded-full w-4 h-4 border-2 border-white"></div>
                <div class="text-sm text-gray-600 font-semibold">{{ item.date }}</div>
                <div class="text-gray-800">{{ item.desc }}</div>
              </div>
            </div>
          </section>
          
          <h3 class="text-md font-semibold mt-6 mb-2 text-gray-800">Pantau status pengiriman dari berbagai ekspedisi</h3>
          <p class="text-gray-600 text-sm">Cek resi JNE, AnterAja, J&T, J&T Cargo, ID Express, SiCepat Ekspres, Lion Parcel, TIKI, Pos Indonesia, Ninja Xpress, dan banyak layanan pengiriman lainnya.</p>
          
          <h3 class="text-md font-semibold mt-6 mb-2 text-gray-800">Monitor pengiriman dengan praktis, cepat, dan tepat</h3>
          <p class="text-gray-600 text-sm">Fitur unggulan DM track Go adalah pelacakan paket yang komprehensif, responsif, dan akurat.</p>
        </div>
        
        <transition name="fade">
          <div v-if="copied" class="fixed inset-0 flex items-center justify-center z-50">
            <div class="bg-white border border-green-400 text-green-700 px-6 py-4 rounded-2xl shadow-lg text-center animate-bounce">
              <svg class="w-6 h-6 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p class="font-semibold">URL berhasil disalin!</p>
            </div>
          </div>
        </transition>
  `,
  data() {
    return {
      couriers: [],
      search: '',
      resi: '',
      selectedCourier: null,
      dropdownOpen: false,
      receiptResults: {},
      loading: false,
      copied: false,
    };
  },
  computed: {
    filteredCouriers() {
      const keyword = this.search.toLowerCase();
      return this.couriers
        .filter(c => c.name.toLowerCase().includes(keyword))
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      setTimeout(() => this.dropdownOpen = false, 150);
    },
    selectCourier(courier) {
      this.selectedCourier = courier;
      this.search = '';
      this.dropdownOpen = false;
    },
    async copyURL() {
      const url = window.location.href;
      const summary = this.receiptResults.summary || {};
      const detail = this.receiptResults.detail || {};

      const text = [
        `📦 Kurir: ${summary.courier || '-'}`,
        `📮 Status: ${summary.status || '-'}`,
        `👤 Penerima: ${detail.receiver || '-'}`,
        `📅 Tanggal: ${summary.date || '-'}`,
        '',
        `${url}`
      ].join('\n');

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
      } catch (err) {
        console.error('Gagal salin:', err);
      }
    },
    check() {
      if (!this.selectedCourier || !this.resi) return;
      this.loading = true;
      axios.post('api/track', {
        courier: this.selectedCourier.code,
        awb: this.resi
      }).then(res => {
        this.receiptResults = res.data.data;
        window.location.hash = `#/${this.selectedCourier.code}/${this.resi}`;
      }).catch(console.error)
        .finally(() => this.loading = false);
    }
  },
  mounted() {
    axios.post('api/couriers').then(res => {
      if (res.data.status) {
        this.couriers = res.data.data;
        const hash = window.location.hash;
        const match = hash.match(/^#\/([^\/]+)\/(.+)$/);
        if (match) {
          const kurir = match[1];
          const awb = match[2];
          const found = this.couriers.find(c => c.code.toLowerCase() === kurir.toLowerCase());
          if (found) {
            this.selectedCourier = found;
            this.resi = awb;
            this.check();
          }
        }
      }
    }).catch(console.error);
  }
};