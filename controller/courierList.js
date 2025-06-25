const axios = require('axios');
const apiKey = '';

exports.getCourierList = (req, res) => {
  const couriers = [
    { name: 'JNE', code: 'jne' },
    { name: 'POS Indonesia', code: 'pos' },
    { name: 'J&T Express', code: 'jnt' },
    { name: 'J&T Kargo', code: 'jnt_cargo' },
    { name: 'SiCepat', code: 'sicepat' },
    { name: 'Tiki', code: 'tiki' },
    { name: 'AnterAja', code: 'anteraja' },
    { name: 'Wahana', code: 'wahana' },
    { name: 'Ninja', code: 'ninja' },
    { name: 'Lion', code: 'lion' },
    { name: 'PCP Express', code: 'pcp' },
    { name: 'JET Express', code: 'jet' },
    { name: 'REX Express', code: 'rex' },
    { name: 'First Logistics', code: 'first' },
    { name: 'ID Express', code: 'ide' },
    { name: 'Shopee Express', code: 'spx' },
    { name: 'KGXpress', code: 'kgx' },
    { name: 'SAP Express', code: 'sap' },
    { name: 'JX Express', code: 'jxe' },
    { name: 'RPX', code: 'rpx' },
    { name: 'Lazada Express', code: 'lex' },
    { name: 'Indah Cargo', code: 'indah_cargo' },
    { name: 'Dakota Cargo', code: 'dakota' },
    { name: 'Kurir Rekomendasi (Tokopedia)', code: 'kurir_tokopedia' }
  ];

  res.json({
    status: true,
    data: couriers
  });
};

exports.trackCourier = async (req, res) => {
  const { courier, awb } = req.body;
  if (!courier || !awb) {
    return res.status(400).json({
      status: false,
      message: 'Parameter courier dan awb wajib diisi.'
    });
  }

  const url = `https://api.binderbyte.com/v1/track?api_key=${apiKey}&courier=${courier}&awb=${awb}`;

  try {
    const response = await axios.get(url, { timeout: 10000 });
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error('API Response Error:', error.response.status, error.response.data);
      return res.status(500).json({
        status: false,
        message: 'Gagal dari API: ' + JSON.stringify(error.response.data)
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'Gagal menghubungi API: ' + (error.message || 'Unknown error')
      });
    }
  }
};