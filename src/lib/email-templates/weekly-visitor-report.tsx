import * as React from "react";
import { Html, Head, Body, Container, Heading, Text, Section, Hr, Row, Column } from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface PageStat { path: string; views: number }

interface Props {
  weekStart?: string;
  weekEnd?: string;
  totalViews?: number;
  uniqueVisitors?: number;
  topPages?: PageStat[];
}

export function WeeklyVisitorReport({
  weekStart = "01.01.2025",
  weekEnd = "07.01.2025",
  totalViews = 0,
  uniqueVisitors = 0,
  topPages = [],
}: Props) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Inter, Arial, sans-serif", backgroundColor: "#f7f5f1", padding: "24px 0", margin: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#ffffff", padding: 32, borderRadius: 8 }}>
          <Heading style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "#2d2d2d", fontSize: 28, margin: "0 0 8px" }}>
            Wochenreport · Finca Na Fideuera
          </Heading>
          <Text style={{ color: "#777", fontSize: 14, margin: "0 0 24px" }}>
            {weekStart} – {weekEnd}
          </Text>

          <Section style={{ backgroundColor: "#f7f5f1", padding: 20, borderRadius: 6, marginBottom: 24 }}>
            <Row>
              <Column>
                <Text style={{ fontSize: 13, color: "#777", margin: 0 }}>Seitenaufrufe</Text>
                <Text style={{ fontSize: 32, color: "#2d2d2d", fontWeight: 600, margin: "4px 0 0" }}>{totalViews}</Text>
              </Column>
              <Column>
                <Text style={{ fontSize: 13, color: "#777", margin: 0 }}>Eindeutige Besucher</Text>
                <Text style={{ fontSize: 32, color: "#2d2d2d", fontWeight: 600, margin: "4px 0 0" }}>{uniqueVisitors}</Text>
              </Column>
            </Row>
          </Section>

          <Heading as="h2" style={{ fontSize: 18, color: "#2d2d2d", margin: "0 0 12px" }}>
            Beliebteste Seiten
          </Heading>
          {topPages.length === 0 ? (
            <Text style={{ color: "#777", fontSize: 14 }}>Diese Woche keine Aufrufe.</Text>
          ) : (
            topPages.map((p, i) => (
              <Row key={i} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
                <Column style={{ width: "70%" }}>
                  <Text style={{ margin: 0, fontSize: 14, color: "#2d2d2d" }}>{p.path === "/" ? "Startseite" : p.path}</Text>
                </Column>
                <Column style={{ width: "30%", textAlign: "right" }}>
                  <Text style={{ margin: 0, fontSize: 14, color: "#777", fontWeight: 600 }}>{p.views}</Text>
                </Column>
              </Row>
            ))
          )}

          <Hr style={{ borderColor: "#eee", margin: "32px 0 16px" }} />
          <Text style={{ fontSize: 12, color: "#999", textAlign: "center", margin: 0 }}>
            Automatischer Wochenreport · finca-na-fideuera.de
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export const template = {
  component: WeeklyVisitorReport,
  subject: (data: Record<string, unknown>) =>
    `Wochenreport Finca Na Fideuera (${(data.weekStart as string) ?? ""} – ${(data.weekEnd as string) ?? ""})`,
  displayName: "Wöchentlicher Besucher-Report",
  to: "a.moelders@googlemail.com",
  previewData: {
    weekStart: "01.01.2025",
    weekEnd: "07.01.2025",
    totalViews: 142,
    uniqueVisitors: 87,
    topPages: [
      { path: "/", views: 56 },
      { path: "/galerie", views: 34 },
      { path: "/preise", views: 28 },
      { path: "/die-finca", views: 14 },
      { path: "/kontakt", views: 10 },
    ],
  },
} satisfies TemplateEntry;
