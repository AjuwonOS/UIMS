export async function successfulPaymentController(req, res) {
  try {
      console.log(req.body);
      res.status(200)
  } catch (error) {
    console.error(error);
  }
}
