// 4. MINT: Mesin cetak uang khusus Pak Lurah
    // Fungsi ini public biar total supply kelihatan, tapi masuk ke private balance
    #[aztec(public)]
    fn mint(
        amount: u64, 
        owner: AztecAddress
    ) {
        // 1. Tambah total supply publik
        let current_supply = storage.total_supply.read();
        storage.total_supply.write(current_supply + amount);

        // 2. Bikin "Uang Kertas" (Note) rahasia buat si owner
        // (Logika ZK di balik layar buat nyembunyiin saldo)
        let mut note = ValueNote::new(amount, owner);
        storage.balances.at(owner).insert(&mut note, true);
    }
