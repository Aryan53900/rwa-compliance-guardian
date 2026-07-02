use compliance_attestation::compliance_attestation::ComplianceAttestation;
use odra::host::{HostEnv, NoArgs};
use odra_cli::{
    deploy::DeployScript,
    DeployedContractsContainer,
    DeployerExt,
    OdraCli,
};

pub struct ComplianceDeployScript;

impl DeployScript for ComplianceDeployScript {
    fn deploy(
        &self,
        env: &HostEnv,
        container: &mut DeployedContractsContainer,
    ) -> Result<(), odra_cli::deploy::Error> {
        ComplianceAttestation::load_or_deploy(
            env,
            NoArgs,
            container,
            350_000_000_000,
        )?;

        Ok(())
    }
}

fn main() {
    OdraCli::new()
        .about("Compliance Attestation CLI")
        .deploy(ComplianceDeployScript)
        .contract::<ComplianceAttestation>()
        .build()
        .run();
}