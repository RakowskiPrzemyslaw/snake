import { Center, Text3D } from "@react-three/drei";
import { useAtom } from "jotai";
import { collectiblesAtom } from "./context/game";

export function Letters() {
  const [collectibles] = useAtom(collectiblesAtom);

  return (
    <group>
      {collectibles.map((collectible) => {
        return <Letter key={collectible.id} collectible={collectible} />;
      })}
    </group>
  );
}

function Letter({ collectible }) {
  return (
    <group>
      <pointLight
        color={collectible.color}
        castShadow
        intensity={6}
        position={[
          collectible.position.x - 0.5,
          collectible.position.y - 0.5,
          2,
        ]}
      />
      <Center position={[collectible.position.x, collectible.position.y, 0]}>
        <Text3D
          castShadow
          receiveShadow
          font="/noto.json"
          curveSegments={32}
          bevelEnabled
          bevelSize={0.03}
          bevelThickness={0.05}
          height={0.1}
          size={0.6}
        >
          {collectible.code}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}
