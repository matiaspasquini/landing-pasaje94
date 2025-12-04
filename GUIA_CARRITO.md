# 🛒 Carrito de Compras - Guía de Uso

## 🚀 Desarrollo

### Opción 1: Desarrollo Rápido (sin Stripe)
Para desarrollo rápido de UI sin probar pagos:

```bash
npm run dev
```

Abre: http://localhost:5173

**Nota:** El checkout no funcionará porque las Netlify Functions no están disponibles en este modo.

### Opción 2: Desarrollo Completo (con Stripe)
Para probar el flujo completo incluyendo pagos:

```bash
npm run dev:netlify  
```

Abre: http://localhost:8888

**Nota:** Este modo puede tener conflictos con Hot Module Replacement. Si ves errores, refresca la página.

## 📦 Producción

### Deploy en Netlify

1. **Push a tu repositorio:**
```bash
git add .
git commit -m "Restaurado carrito de compras con Stripe"
git push
```

2. **Configurar variables de entorno en Netlify:**
   - Ve a: Site settings > Environment variables
   - Agrega tus claves de Stripe (las que están en el archivo `.env` local):
     ```
     VITE_STRIPE_PUBLISHABLE_KEY=pk_live_TU_CLAVE_PUBLICA_AQUI
     
     STRIPE_SECRET_KEY=sk_live_TU_CLAVE_SECRETA_AQUI
     ```
   - **IMPORTANTE:** Usa las mismas claves que tienes en tu archivo `.env` local

3. **Deploy automático:**
   Netlify detectará el push y desplegará automáticamente.

## ✅ Funcionalidades Restauradas

- ✅ Agregar productos al carrito
- ✅ Ver carrito con contador en header  
- ✅ Modificar cantidades
- ✅ Eliminar productos
- ✅ Checkout con formulario completo
- ✅ Integración Stripe (producción)
- ✅ Cálculo de envío por país
- ✅ Confirmación de orden

## 🧪 Testing

### En Desarrollo Local (con dev:netlify)
Las claves están configuradas en `.env` (LIVE mode).

### En Producción
Los pagos son REALES con las claves LIVE.

## ⚠️ Importante

- El archivo `.env` NO se sube a Git (está en `.gitignore`)
- Las claves LIVE procesan pagos reales
- En producción DEBES configurar las variables en Netlify Dashboard

## 🔍 Troubleshooting

### "Cannot read properties of undefined (reading 'addToCart')"
→ Reinicia el servidor

### "Network error al hacer checkout"  
→ Usa `npm run dev:netlify` en lugar de `npm run dev`

### "Payment fails en producción"
→ Verifica que las variables de entorno estén en Netlify Dashboard

## 📝 Flujo de Usuario

1. `/space` - Ver productos
2. Click "Agregar al carrito"
3. Header muestra contador
4. `/cart` - Revisar carrito
5. `/checkout` - Llenar formulario y pagar
6. `/order-confirmation` - Confirmación

¡Listo para vender! 🎉
