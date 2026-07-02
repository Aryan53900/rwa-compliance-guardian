use odra::prelude::*;

/// A module definition. Each module struct consists Vars and Mappings
/// or/and another modules.
#[odra::odra_type]
// #[derive(Clone)]
pub struct Attestation  {
    pub id: u64,
    pub wallet: String,
    pub asset_type: String,
    pub jurisdiction: String,
    pub investor_country: String,
    pub risk_score: u8,
    pub result: String,
    pub timestamp: String,
}
#[odra::module]
pub struct ComplianceAttestation{
    /// The module itself does not store the value,
    /// it's a proxy that writes/reads value to/from the host.
    last_id: Var<u64>,
    attestations: Mapping<u64, Attestation>,
}

/// Module implementation.
/// 
/// To generate entrypoints,
/// an implementation block must be marked as #[odra::module].
#[odra::module]
impl ComplianceAttestation{
    /// Odra constructor.
    /// 
    /// Initializes the contract.
    pub fn get_last_id(&self) -> u64 {
        self.last_id.get_or_default()
    }
    pub fn init(&mut self) {
        self.last_id.set(0);
    }

    /// Replaces the current value with the passed argument.
    pub fn store_attestation(
        &mut self,
        wallet: String,
        asset_type: String,
        jurisdiction: String,
        investor_country: String,
        risk_score: u8,
        result: String,
        timestamp: String,
    ) {
        let id = self.last_id.get_or_default() + 1;
    
        let attestation = Attestation {
            id,
            wallet,
            asset_type,
            jurisdiction,
            investor_country,
            risk_score,
            result,
            timestamp,
        };
    
        self.attestations.set(&id, attestation);
    
        self.last_id.set(id);
    }
    /// Replaces the current value with the opposite value.
    // pub fn flip(&mut self) {
    //     self.value.set(!self.get());
    // }

    /// Retrieves value from the storage. 
    /// If the value has never been set, the default value is returned.
    pub fn get_attestation(&self, id: u64) -> Option<Attestation> {
        self.attestations.get(&id)
    }}
//     #[cfg(test)]
//     mod tests {}
// // #[cfg(test)]
// mod tests {
//     use crate::flipper::Flipper;
//     use odra::host::{Deployer, NoArgs};

//     #[test]
//     fn flipping() {
//         let env = odra_test::env();
//         // To test a module we need to deploy it. `Flipper` implements `Deployer` trait, 
//         // so we can use it to deploy the module.
//         let mut contract = Flipper::deploy(&env, NoArgs);
//         assert_eq!(contract.get(), 0);

// contract.increment();

// assert_eq!(contract.get(), 1);
//     }
// }
#[cfg(test)]
mod tests {
    use crate::compliance_attestation::ComplianceAttestation;
    use odra::host::{Deployer, NoArgs};

    #[test]
    fn store_attestation_test() {
        let env = odra_test::env();

        let mut contract = ComplianceAttestation::deploy(&env, NoArgs);

        contract.store_attestation(
            "0xABC123".to_string(),
            "Real Estate".to_string(),
            "UAE".to_string(),
            "India".to_string(),
            18,
            "PASS".to_string(),
            "2026-06-30".to_string(),
        );

        assert_eq!(contract.get_last_id(), 1);

        let record = contract.get_attestation(1).unwrap();

        assert_eq!(record.id, 1);
        assert_eq!(record.wallet, "0xABC123");
        assert_eq!(record.asset_type, "Real Estate");
        assert_eq!(record.jurisdiction, "UAE");
        assert_eq!(record.investor_country, "India");
        assert_eq!(record.risk_score, 18);
        assert_eq!(record.result, "PASS");
    }
}