/**
 * Labeled, inspectable entity shared across scenes. Positions: x/z in scene
 * meters, y = offset above local terrain. Claims resolve through the data
 * registry so every label traces to sources.
 */
export interface SceneEntityDef {
  id: string;
  title: string;
  kind: 'settlement' | 'structure' | 'group' | 'person' | 'route' | 'feature';
  position: [number, number, number];
  description: string;
  claimIds: string[];
}
