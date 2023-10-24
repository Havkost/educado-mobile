import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import {Alert, TouchableWithoutFeedback} from "react-native";

const ANIMATION_STATES = {
    INITIAL: "initial",
    DOWNLOADING: "downloading",
    FINISHING: "finishing",
    COMPLETED: "completed",
    DELETE: "delete",
}

export default function ControllingAnimationProgress() {
    const animationRef = useRef(null);
    const [animationState, setAnimationState] = useState(ANIMATION_STATES.INITIAL);

    useEffect(() => {
        if (animationRef.current) {
            switch (animationState) {
                case ANIMATION_STATES.INITIAL:
                    return animationRef.current.play(17, 17);
                case ANIMATION_STATES.DOWNLOADING:
                    return animationRef.current.play(18, 77);
                case ANIMATION_STATES.FINISHING:
                    setTimeout(() => setAnimationState(ANIMATION_STATES.COMPLETED), 2333);
                    return animationRef.current.play(78, 148);
                case ANIMATION_STATES.COMPLETED:
                    return animationRef.current.play(149, 149);
                case ANIMATION_STATES.DELETE:
                    setTimeout(() => setAnimationState(ANIMATION_STATES.INITIAL), 1066);
                    return animationRef.current.play(110, 78);
                default:
                    break;
            }
        }
    }, [animationState]);

    const downloadConfirmation = () =>
        Alert.alert("Baixar curso", "Deseja baixar este curso para acesso offline?", [
            {
                text: "Cancelar",
                onPress: () => console.log("Download Cancelled"),
                style: "cancel",
            },
            {
                text: "Baixar",
                onPress: () => {
                    setAnimationState(ANIMATION_STATES.DOWNLOADING);
                    setTimeout(() => setAnimationState(ANIMATION_STATES.FINISHING), 5000);
                },
            },
        ]);


    const removeDownloadConfirmation = () =>
        Alert.alert("Remover curso", "Tem certeza de que deseja remover este curso baixado?", [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Remover",
                onPress: () => {
                    setAnimationState(ANIMATION_STATES.DELETE);
                },
                style: "destructive",
            },
        ]);


    // TODO: Implement download functionality
    const handlePress = () => {
        // For testing purposes - (simulate downloading a course)
        if (animationState === ANIMATION_STATES.INITIAL) {
            downloadConfirmation();
        }
        // For testing purposes (reset to initial state if completed)
        if (animationState === ANIMATION_STATES.COMPLETED) {
            removeDownloadConfirmation();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <LottieView
                ref={animationRef}
                source={require('../../../assets/animations/downloadAnimation.json')}
                height={32}
                width={24}
            />
        </TouchableWithoutFeedback>
    );
}
