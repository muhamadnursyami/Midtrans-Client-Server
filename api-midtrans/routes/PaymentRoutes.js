import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

router.post("/process-transaction", (req, res) => {
  try {
    // ngebuat snap terlebih dahulu yaitu untuk mengkonfigurasi midtransnya
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-gORde_dWp705cjpG83gmESAM",
      clientKey: "SB-Mid-client-mlO52_u6cIrvUnvQ",
    });

    // buat paramater yaitu request bodynya
    const parameter = {
      // transaction_Detail wajib dibuat -> detailny  lihat dokumentasi
      //   https://docs.midtrans.com/reference/request-body-json-parameter
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total,
      },
      //   customer detail optional.
      customer_details: {
        first_name: req.body.name,
      },
    };

    // setelah membuat paramater selanjutnnya kita akan buat snap
    // untuk menampung isi dari paramtert
    snap.createTransaction(parameter).then((transaction) => {
      const dataPayment = {
        response: JSON.stringify(transaction),
      };
      const token = transaction.token;

      res.status(200).json({
        message: "berhasil",
        dataPayment,
        token: token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
