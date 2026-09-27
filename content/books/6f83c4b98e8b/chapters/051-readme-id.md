# Bab 2 · Rekayasa Context

> Context menentukan batas atas kemampuan Agent: struktur API, desain ramah KV Cache, prompt engineering, Agent Skills, status bar, dan kompresi context.

← [Kembali ke README utama](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/docs/id/README.md) · 📖 [Baca bab](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/book-id/chapter2.md)

## Cara Membaca Eksperimen

Teks utama memakai skeleton mekanisme singkat untuk menjelaskan alur kontrol; direktori eksperimen berisi adapter SDK lengkap, log, pengujian, dan bukti penerimaan. Anda tidak perlu membaca setiap berkas baris demi baris.

- **Starter:** Mulai dari tujuan, perintah minimum, dan syarat penerimaan; awali dengan [context-compression](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/context-compression/);
- **Builder:** Telusuri titik masuk, loop inti, skema status/pesan, alat, dan verifier.
- **Maintainer:** Terakhir, baca pengujian, manifest bukti, penanganan kegagalan, rollback, dan adapter provider.

Pada pembacaan pertama, lewati kredensial, presentasi, dan kompatibilitas provider; kembali saat mereproduksi angka.

## Proyek Pendamping

| Eksperimen | Proyek | Jenis | Deskripsi |
| :--: | --- | :--: | --- |
| 2-1 | [local_llm_serving](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/local_llm_serving/) | ✅ | Menyediakan deployment LLM lokal lintas platform dengan backend vLLM atau Ollama. |
| 2-2, 2-7 | [attention_visualization](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/attention_visualization/) | ✅ | Memvisualisasikan token input/output dan distribusi bobot attention model. |
| 2-3 | [kv-cache](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/kv-cache/) | ✅ | Membandingkan pola pengelolaan context dan dampaknya terhadap efisiensi KV Cache. |
| 2-4 | [prompt-engineering](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/prompt-engineering/) | ✅ | Mengukur pengaruh unsur prompt melalui eksperimen ablasi yang sistematis. |
| 2-5 | [prompt-injection](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/prompt-injection/) | ✅ | Membandingkan tiga skenario serangan dengan empat konfigurasi pertahanan berlapis. |
| 2-6 | [agent-skills-ppt](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/agent-skills-ppt/) | ✅ | Mempraktikkan progressive disclosure pada Agent Skills untuk menghasilkan presentasi PPTX. |
| 2-7 | Eksperimen teks | 🚧 | Membuat Skill penulisan ringan dari contoh pribadi, mencakup kondisi pemicu, aturan, contoh, cakupan, dan pemeliharaan iteratif. |
| 2-8 | [system-hint](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/system-hint/) | ✅ | Menguji pengaruh System Hints terhadap perilaku dan kinerja Agent. |
| 2-9 | [context-compression](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter2/context-compression/) | ✅ | Membandingkan beberapa strategi kompresi untuk mengurangi token tanpa kehilangan kemampuan utama. |

## Jenis Proyek

| Ikon | Jenis | Arti |
| :--: | --- | --- |
| ✅ | **Mandiri** | Kode lengkap tersedia di repositori dan dapat dijalankan setelah API Key dikonfigurasi. |
| 📖 | **Panduan Reproduksi** | Memerlukan repositori eksternal yang harus di-`git clone`. |
| 🚧 | **Dalam Proses** | Implementasi atau bukti penerimaan belum lengkap. |
