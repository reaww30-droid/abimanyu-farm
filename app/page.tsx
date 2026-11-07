'use client';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans">
      {/* Memuat tampilan HTML lengkap Abimanyu Farm Pro */}
      <iframe
        srcDoc={`
          <!DOCTYPE html>
          <html lang="id" class="light">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Abimanyu Farm - Dashboard Peternakan Sapi & Kambing</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <script>
                  tailwind.config = {
                      darkMode: 'class',
                      theme: {
                          extend: {
                              colors: {
                                  brand: {
                                      50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a',
                                  }
                              }
                          }
                      }
                  }
              </script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
              <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
              <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
              <script src="https://unpkg.com/html5-qrcode"></script>
          </head>
          <body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans min-h-screen p-4">
              <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 text-center space-y-4">
                  <div class="w-16 h-16 bg-brand-500/10 text-brand-600 rounded-2xl flex items-center justify-center mx-auto text-3xl">
                      <i class="fa-solid fa-cow"></i>
                  </div>
                  <h1 class="text-2xl font-black">Abimanyu Farm Pro</h1>
                  <p class="text-sm text-slate-500">Dashboard Anda siap diintegrasikan dengan database Supabase PostgreSQL.</p>
                  <a href="/dashboard" class="inline-block bg-brand-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-brand-700 transition">
                      Masuk ke Sistem Utama
                  </a>
              </div>
          </body>
          </html>
        `}
        className="w-full h-screen border-none"
        title="Abimanyu Farm Dashboard"
      />
    </main>
  );
}