export async function initiatePayment(email,costOfKey, paymentUrl, apiKey) {
  const response = await fetch(
    paymentUrl,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: `${costOfKey}00`,
      }),
    },
  );
    
    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json();
    return data.data
}
