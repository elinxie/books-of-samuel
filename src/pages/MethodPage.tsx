import { Link } from 'react-router-dom';
import { Page } from '../ui/SiteChrome';
import { Legend } from '../ui/Legend';
import { CLAIMS } from '../data';
import { ClaimCard } from '../ui/ClaimCard';

export function MethodPage() {
  const exemplars = CLAIMS.filter((c) =>
    ['claim-ziklag-location', 'claim-mudbrick', 'claim-smoke-duration'].includes(c.id),
  );

  return (
    <Page>
      <h1>How this is reconstructed</h1>
      <p className="page-lede">
        The goal is an embodied sense of place that stays honest. Every visual assertion in a scene
        is a <em>reconstruction claim</em> with an evidential basis, a confidence level, cited
        sources, and — where scholarship disagrees — the competing views side by side. Disputes are
        never collapsed into fake consensus.
      </p>

      <h2>The pipeline</h2>
      <p>
        1) The passage is anchored (ESV references) and summarized. 2) Historical, geographic, and
        material questions raised by the passage become claims. 3) Each claim is tied to source
        cards — biblical text, excavation reports, historical geography, comparative ancient Near
        Eastern evidence, or named scholarly reconstructions. 4) Claims are assigned a confidence
        level, and disputed ones carry the alternatives. 5) Only then is the scene composed, with
        anything unsupported explicitly labeled a design placeholder.
      </p>

      <h2>The legend</h2>
      <Legend />

      <h2>Narrated versus corroborated</h2>
      <p className="page-lede">
        “High confidence · Biblical text” means the narrative clearly states it — not that it is
        independently corroborated. Where corroboration exists (or fails), the claim’s notes say so.
        This keeps the text’s own voice distinct from archaeology’s.
      </p>

      <h2>Three examples from the Ziklag scene</h2>
      {exemplars.map((c) => (
        <ClaimCard key={c.id} claim={c} forceExpanded />
      ))}

      <h2>Anachronism discipline</h2>
      <p className="page-lede">
        Clothing, armor, weapons, architecture, roads, crops, animal use, city scale,
        fortifications, religious objects, language labels, and political geography are each checked
        against period evidence before appearing in a scene. Where the period evidence is thin, the
        element is either omitted or labeled speculative — the current placeholder figures, for
        example, deliberately carry no weapons or armor rather than risk inventing them.
      </p>

      <h2>Depicting violence</h2>
      <p className="page-lede">
        Warfare is part of these chapters and will be shown honestly — but not gratuitously. The 1
        Samuel 31 scenes (Milestone 3) will render death without sensationalism and include a
        reduced-intensity mode. The study purpose stays primary.
      </p>

      <h2>Commentary policy</h2>
      <p className="page-lede">
        The current release carries historical-literary and observational annotation only.
        Theological commentary is deliberately deferred; when added, it will be a separate toggle,
        clearly distinguished from biblical text, historical reconstruction, archaeological
        evidence, and design speculation.
      </p>

      <h2>Where the open questions live</h2>
      <p className="page-lede">
        The running register of uncertainties (Ziklag’s site, chronology debates, army numbers,
        camel use, and more) is versioned in <code>/docs/uncertainty-register.md</code>, and each
        scene’s “Certain vs reconstructed” panel shows the claims behind what you are looking at.
        Start in the <Link to="/observe/ziklag-aftermath">Ziklag scene</Link> and open the panel.
      </p>
    </Page>
  );
}
