# Bab 3 · Memori Pengguna dan Knowledge Base

> Memungkinkan Agent mengingat pengguna lintas sesi dan mengakses pengetahuan eksternal melalui memori, RAG, indeks terstruktur, dan knowledge graph.

← [Kembali ke README utama](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/docs/id/README.md) · 📖 [Baca bab](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/book-id/chapter3.md)

## Cara Membaca Eksperimen

Teks utama memakai skeleton mekanisme singkat untuk menjelaskan alur kontrol; direktori eksperimen berisi adapter SDK lengkap, log, pengujian, dan bukti penerimaan. Anda tidak perlu membaca setiap berkas baris demi baris.

- **Starter:** Mulai dari tujuan, perintah minimum, dan syarat penerimaan; awali dengan [user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/user-memory/) / [retrieval-pipeline](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/retrieval-pipeline/);
- **Builder:** Telusuri titik masuk, loop inti, skema status/pesan, alat, dan verifier.
- **Maintainer:** Terakhir, baca pengujian, manifest bukti, penanganan kegagalan, rollback, dan adapter provider.

Pada pembacaan pertama, lewati kredensial, presentasi, dan kompatibilitas provider; kembali saat mereproduksi angka.

## Proyek Pendamping

| Eksperimen | Proyek | Jenis | Deskripsi |
| :--: | --- | :--: | --- |
| 3-1, 3-2 | [user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/user-memory/) | ✅ | Membangun memori pengguna jangka panjang untuk preferensi dan riwayat interaksi. |
| 3-1 | [user-memory-evaluation](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/user-memory-evaluation/) | ✅ | Mengevaluasi akurasi, relevansi, dan efektivitas sistem memori pengguna. |
| 3-2 | [mem0](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/mem0/) · [memobase](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/memobase/) | ✅ | Membandingkan implementasi memori menggunakan framework Mem0 dan Memobase. |
| 3-3 | [log-sanitization](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/log-sanitization/) | ✅ | Mendeteksi dan menyamarkan secret serta PII pada log dengan model lokal. |
| 3-4 | [dense-embedding](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/dense-embedding/) | ✅ | Membandingkan indeks approximate nearest neighbor ANNOY dan HNSW. |
| 3-5 | [sparse-embedding](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/sparse-embedding/) | ✅ | Mengimplementasikan mesin pencarian sparse berbasis BM25 dari awal. |
| 3-6 | [retrieval-pipeline](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/retrieval-pipeline/) | ✅ | Menggabungkan dense retrieval, sparse retrieval, dan neural reranking. |
| 3-7 | [structured-index](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/structured-index/) | ✅ | Membandingkan RAPTOR dan GraphRAG sebagai pendekatan pengindeksan terstruktur. |
| 3-8 | [agentic-rag](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/agentic-rag/) | ✅ | Membandingkan RAG tradisional dengan Agentic RAG yang melakukan retrieval iteratif. |
| 3-9 | [agentic-rag-for-user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/agentic-rag-for-user-memory/) | ✅ | Menerapkan Agentic RAG untuk mengambil riwayat percakapan lintas sesi. |
| 3-10 | [contextual-retrieval](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/contextual-retrieval/) | ✅ | Menambahkan prefix context pada chunk untuk mengurangi kegagalan retrieval. |
| 3-11 | [contextual-retrieval-for-user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/contextual-retrieval-for-user-memory/) | ✅ | Menggabungkan Advanced JSON Cards dan Contextual RAG menjadi memori dua lapis. |
| 3-12 | [structured-knowledge-extraction](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/structured-knowledge-extraction/) | ✅ | Mengekstraksi faktor keputusan dan prototipe kasus dari dataset putusan hukum. |

## Jenis Proyek

| Ikon | Jenis | Arti |
| :--: | --- | --- |
| ✅ | **Mandiri** | Kode lengkap tersedia di repositori dan dapat dijalankan setelah API Key dikonfigurasi. |
| 📖 | **Panduan Reproduksi** | Memerlukan repositori eksternal yang harus di-`git clone`. |
| 🚧 | **Dalam Proses** | Implementasi atau bukti penerimaan belum lengkap. |
