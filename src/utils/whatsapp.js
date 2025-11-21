export const generateWhatsAppMessage = (cartItems, customerInfo, cartTotal) => {
  const { name, email, phone, address, city, postalCode, notes } = customerInfo

  let message = `🛍️ *NUEVO PEDIDO - PASAJE 94*\n\n`
  
  message += `👤 *DATOS DEL CLIENTE*\n`
  message += `Nombre: ${name}\n`
  message += `Email: ${email}\n`
  message += `Teléfono: ${phone}\n`
  message += `Dirección: ${address}\n`
  message += `Ciudad: ${city}\n`
  message += `Código Postal: ${postalCode}\n`
  
  if (notes) {
    message += `\n📝 *Notas adicionales:*\n${notes}\n`
  }
  
  message += `\n🛒 *PRODUCTOS*\n`
  message += `━━━━━━━━━━━━━━━━\n`
  
  cartItems.forEach((item, index) => {
    message += `\n${index + 1}. ${item.name}\n`
    message += `   Artista: ${item.artist}\n`
    message += `   Precio: €${item.price.toFixed(2)}\n`
    message += `   Cantidad: ${item.quantity}\n`
    message += `   Subtotal: €${(item.price * item.quantity).toFixed(2)}\n`
  })
  
  message += `\n━━━━━━━━━━━━━━━━\n`
  message += `💰 *TOTAL: €${cartTotal.toFixed(2)}*\n\n`
  message += `¡Gracias por tu pedido! Te contactaremos pronto para confirmar la compra.`
  
  return encodeURIComponent(message)
}

export const sendWhatsAppMessage = (message, phoneNumber = '+5493884040243') => {
  // Formato del número: sin + ni espacios, ej: 34612345678
  const url = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(url, '_blank')
}