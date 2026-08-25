import { useMemo } from 'react';
import { useAppStore } from '../../state/store';
import { mulberry32 } from '../../engine/noise';
import { CONSTRUCTION_GROUND_CENTER } from './layout';

/**
 * The construction ground for the Hiram beat (`claim-hiram-building`,
 * `asset-jerusalem-construction-ground`) — timber baulks, dressed-stone
 * courses, and a partially raised structure, standing for "a house going
 * up." **Not allowed, and not built here**: a finished cedar palace, any
 * 9th-8th century royal-architecture vocabulary (proto-Aeolic capitals,
 * decorative ashlar programs, window balustrades), or identification of
 * this structure with any excavated building proposed as David's palace —
 * the unfinished state is the honest form (Resolved design calls).
 * Undressed timber cylinders + stacked stone-course boxes, deliberately
 * simple primitive geometry, not modeled assets.
 */

interface TimberBaulk {
  x: number;
  z: number;
  yaw: number;
  len: number;
}

interface StoneCourse {
  x: number;
  z: number;
  yLevel: number;
  w: number;
  d: number;
}

function buildTimberStack(seed: number): TimberBaulk[] {
  const rng = mulberry32(seed);
  const out: TimberBaulk[] = [];
  for (let i = 0; i < 9; i++) {
    out.push({
      x: CONSTRUCTION_GROUND_CENTER[0] - 7 + (i % 3) * 1.1,
      z: CONSTRUCTION_GROUND_CENTER[1] - 6 + Math.floor(i / 3) * 1.1,
      yaw: (rng() - 0.5) * 0.15,
      len: 4.2 + rng() * 1.6,
    });
  }
  return out;
}

function buildWallCourses(seed: number): StoneCourse[] {
  const rng = mulberry32(seed);
  const out: StoneCourse[] = [];
  // Two partial wall runs at different heights — "partially raised," not a
  // completed footprint. Each course is a stack of a few stone-block rows.
  const runs: { x: number; z: number; w: number; d: number; rows: number }[] = [
    {
      x: CONSTRUCTION_GROUND_CENTER[0] + 2,
      z: CONSTRUCTION_GROUND_CENTER[1] + 3,
      w: 6,
      d: 0.6,
      rows: 3,
    },
    {
      x: CONSTRUCTION_GROUND_CENTER[0] + 5,
      z: CONSTRUCTION_GROUND_CENTER[1] - 1,
      w: 0.6,
      d: 5,
      rows: 2,
    },
  ];
  for (const run of runs) {
    for (let row = 0; row < run.rows; row++) {
      out.push({
        x: run.x + (rng() - 0.5) * 0.15,
        z: run.z + (rng() - 0.5) * 0.15,
        yLevel: row,
        w: run.w,
        d: run.d,
      });
    }
  }
  return out;
}

export function ConstructionGround({ shadows }: { shadows: boolean }) {
  const terrain = useAppStore((s) => s.terrain);
  const groundY = terrain.heightAt(CONSTRUCTION_GROUND_CENTER[0], CONSTRUCTION_GROUND_CENTER[1]);
  const timbers = useMemo(() => buildTimberStack(240801), []);
  const courses = useMemo(() => buildWallCourses(240802), []);
  const courseH = 0.42;

  return (
    <group>
      {timbers.map((t, i) => (
        <mesh
          key={`timber-${i}`}
          position={[t.x, groundY + 0.24 + i * 0.02, t.z]}
          rotation={[0, t.yaw, Math.PI / 2]}
          castShadow={shadows}
          receiveShadow
        >
          <cylinderGeometry args={[0.16, 0.19, t.len, 8]} />
          <meshStandardMaterial color="#7a5c3a" roughness={1} />
        </mesh>
      ))}
      {courses.map((c, i) => (
        <mesh
          key={`course-${i}`}
          position={[c.x, groundY + courseH * (c.yLevel + 0.5), c.z]}
          castShadow={shadows}
          receiveShadow
        >
          <boxGeometry args={[c.w, courseH * 0.9, c.d]} />
          <meshStandardMaterial color="#b3a17c" roughness={0.95} />
        </mesh>
      ))}
      {/* A loose scatter of dressed stone blocks awaiting placement. */}
      {Array.from({ length: 7 }).map((_, i) => {
        const rng = mulberry32(240803 + i);
        const x = CONSTRUCTION_GROUND_CENTER[0] - 2 + rng() * 8;
        const z = CONSTRUCTION_GROUND_CENTER[1] - 8 + rng() * 4;
        return (
          <mesh
            key={`block-${i}`}
            position={[x, groundY + 0.22, z]}
            rotation={[0, rng() * Math.PI, 0]}
            castShadow={shadows}
            receiveShadow
          >
            <boxGeometry args={[0.7 + rng() * 0.3, 0.44, 0.5 + rng() * 0.2]} />
            <meshStandardMaterial color="#c2b28c" roughness={0.95} />
          </mesh>
        );
      })}
    </group>
  );
}
