import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'Finca Na Fideuera'

interface ContactInquiryProps {
  name?: string
  email?: string
  von?: string
  bis?: string
  personen?: string
  nachricht?: string
}

const ContactInquiryEmail = ({
  name,
  email,
  von,
  bis,
  personen,
  nachricht,
}: ContactInquiryProps) => (
  <Html lang="de" dir="ltr">
    <Head />
    <Preview>Neue Anfrage von {name || 'einem Gast'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Neue Anfrage — {SITE_NAME}</Heading>
        <Text style={text}>
          Sie haben eine neue Anfrage über das Kontaktformular erhalten:
        </Text>

        <Section style={card}>
          <Row label="Name" value={name} />
          <Row label="E-Mail" value={email} />
          <Row label="Reisezeitraum" value={von || bis ? `${von || '—'} bis ${bis || '—'}` : undefined} />
          <Row label="Personen" value={personen} />
        </Section>

        {nachricht ? (
          <>
            <Heading as="h2" style={h2}>Nachricht</Heading>
            <Text style={messageBox}>{nachricht}</Text>
          </>
        ) : null}

        <Text style={footer}>
          Diese E-Mail wurde automatisch über das Kontaktformular von{' '}
          {SITE_NAME} versendet.
        </Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={rowText}>
    <strong style={rowLabel}>{label}:</strong> {value || '—'}
  </Text>
)

export const template = {
  component: ContactInquiryEmail,
  subject: (data: Record<string, any>) =>
    `Neue Anfrage von ${data.name || 'Gast'} — Finca Na Fideuera`,
  displayName: 'Kontaktformular-Anfrage',
  to: 'buchung@finca-na-fideuera.de',
  previewData: {
    name: 'Max Mustermann',
    email: 'max@example.com',
    von: '2025-06-01',
    bis: '2025-06-08',
    personen: '4',
    nachricht: 'Wir interessieren uns für eine Woche im Juni.',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
}
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#0d3b3a', margin: '0 0 20px' }
const h2 = { fontSize: '16px', fontWeight: 'bold', color: '#0d3b3a', margin: '24px 0 8px' }
const text = { fontSize: '14px', color: '#333', lineHeight: '1.6', margin: '0 0 16px' }
const card = { backgroundColor: '#f7f5f0', padding: '16px 20px', borderRadius: '4px', margin: '16px 0' }
const rowText = { fontSize: '14px', color: '#333', margin: '6px 0', lineHeight: '1.5' }
const rowLabel = { color: '#0d3b3a' }
const messageBox = { fontSize: '14px', color: '#333', lineHeight: '1.6', backgroundColor: '#f7f5f0', padding: '16px 20px', borderRadius: '4px', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#999', margin: '32px 0 0', borderTop: '1px solid #e5e5e5', paddingTop: '16px' }
