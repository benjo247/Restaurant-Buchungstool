import LogoUploader from '../../components/LogoUploader';

export default function SettingsPage() {
  return (
    <section className="simple-page">
      <div className="section-title">
        <p className="eyebrow">Einstellungen</p>
        <h2>Branding</h2>
      </div>
      <LogoUploader />
    </section>
  );
}
