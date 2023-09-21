import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { AfterimagePass } from "three/addons/postprocessing/AfterimagePass.js";

export function PostProcessing() {
  return (
    <EffectComposer multisampling={0} enabled depthBuffer stencilBuffer>
      <Noise opacity={0.2} />
      <Vignette
        darkness={0.8} // vignette darkness
        eskil={false} // Eskil's vignette technique
        blendFunction={BlendFunction.NORMAL} // blend mode
      />
    </EffectComposer>
  );
}
