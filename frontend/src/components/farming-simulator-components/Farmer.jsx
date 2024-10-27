import React, { useEffect, useMemo, useState } from "react";
import { useGraph, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useGrid } from "../../hooks/useGrid";
import { useAtom } from "jotai";
import { userAtom } from "./SocketManager";

const MOVEMENT_SPEED = 0.05;

const Farmer = ({ id, ...props }) => {
  const position = useMemo(() => props.position, []);
  const [path, setPath] = useState();
  const { gridToVector3 } = useGrid();

  useEffect(() => {
    const path = [];
    props.path?.forEach((gridPosition) => {
      path.push(gridToVector3(gridPosition));
    });
    setPath(path);
  }, [props.path]);

  const group = React.useRef();
  const { scene, animations } = useGLTF("/models/Farmer.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);
  const [animation, setAnimation] = useState("CharacterArmature|Idle");

  useEffect(() => {
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation]);

  const [user] = useAtom(userAtom);

  useFrame((state) => {
    if (path?.length && group.current.position.distanceTo(path[0]) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(path[0])
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(path[0]);
      setAnimation("CharacterArmature|Run");
    } else if (path?.length) {
      path.shift();
    } else {
      setAnimation("CharacterArmature|Idle");
    }
    if (id === user) {
      state.camera.position.x = group.current.position.x + 8;
      state.camera.position.y = group.current.position.y + 8;
      state.camera.position.z = group.current.position.z + 8;
      state.camera.lookAt(group.current.position);
    }
  });
  return (
    <group
      ref={group}
      {...props}
      position={position}
      dispose={null}
      name={`character-${id}`}
    >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <group name="Farmer_Feet" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Farmer_Feet_1"
              geometry={nodes.Farmer_Feet_1.geometry}
              material={materials.Brown2}
              skeleton={nodes.Farmer_Feet_1.skeleton}
            />
            <skinnedMesh
              name="Farmer_Feet_2"
              geometry={nodes.Farmer_Feet_2.geometry}
              material={materials.Brown}
              skeleton={nodes.Farmer_Feet_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="Farmer_Pants"
            geometry={nodes.Farmer_Pants.geometry}
            material={materials.LightBlue}
            skeleton={nodes.Farmer_Pants.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <group name="Farmer_Body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Farmer_Body_1"
              geometry={nodes.Farmer_Body_1.geometry}
              material={materials.Brown}
              skeleton={nodes.Farmer_Body_1.skeleton}
            />
            <skinnedMesh
              name="Farmer_Body_2"
              geometry={nodes.Farmer_Body_2.geometry}
              material={materials.LightBlue}
              skeleton={nodes.Farmer_Body_2.skeleton}
            />
            <skinnedMesh
              name="Farmer_Body_3"
              geometry={nodes.Farmer_Body_3.geometry}
              material={materials.Skin}
              skeleton={nodes.Farmer_Body_3.skeleton}
            />
            <skinnedMesh
              name="Farmer_Body_4"
              geometry={nodes.Farmer_Body_4.geometry}
              material={materials.Beige}
              skeleton={nodes.Farmer_Body_4.skeleton}
            />
          </group>
          <group name="Farmer_Head" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name="Farmer_Head_1"
              geometry={nodes.Farmer_Head_1.geometry}
              material={materials.Skin}
              skeleton={nodes.Farmer_Head_1.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_2"
              geometry={nodes.Farmer_Head_2.geometry}
              material={materials.Beige}
              skeleton={nodes.Farmer_Head_2.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_3"
              geometry={nodes.Farmer_Head_3.geometry}
              material={materials.Eyebrows}
              skeleton={nodes.Farmer_Head_3.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_4"
              geometry={nodes.Farmer_Head_4.geometry}
              material={materials.Red}
              skeleton={nodes.Farmer_Head_4.skeleton}
            />
            <skinnedMesh
              name="Farmer_Head_5"
              geometry={nodes.Farmer_Head_5.geometry}
              material={materials.Eye}
              skeleton={nodes.Farmer_Head_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/Farmer.glb");

export default Farmer;
