import React, { useState, useRef, useEffect } from "react";

import {
    Modal,
    View,
    StyleSheet,
    Animated,
    Dimensions,
    PanResponder,
    TouchableWithoutFeedback,
    Easing,
    ImageBackground,
} from "react-native";

const { height } = Dimensions.get("window");



const SwipeDownModal = ({
    duration = 200,
    onClose = () => null,
    customHeader,
    visible,
    children,
    swipeThreshold = 15,
    marginTop = 71,
    swipableHeight = 40,
    backgroundColor = 'rgba(0, 0, 0, .9)',
    headerHeight = 40,
    drawerBackgroundColor = "#ffffff",
    borderTopRadius = 38,
    swipeDisabled = false
}) => {
    const TIMING_CONFIG = {
        duration: duration,
        easing: Easing.inOut(Easing.ease),
    };

    const SWIPABLE_REGION = {
        e1: marginTop,
        e2: marginTop + swipableHeight
    }


    const [headerH, setHeaderH] = useState(headerHeight)

    const handleOnClose = () => {
        setModalVisible(false)
        onClose()
    }

    const pan = useRef(new Animated.ValueXY()).current;

    let [isAnimating, setIsAnimating] = useState(false);
    const [modalVisible, setModalVisible] = useState(visible)

    let animatedValueX = 0;

    let animatedValueY = 0;





    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (swipeDisabled || isAnimating) {
                    return false;
                }
                const startingY = gestureState.moveY - gestureState.dy
                if (startingY > SWIPABLE_REGION.e1 && startingY < SWIPABLE_REGION.e2 && gestureState.dy > swipeThreshold) {
                    return true
                }
                return false;
            },
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: animatedValueX,
                    y: animatedValueY,
                });
                pan.setValue({ x: 0, y: 0 }); // Initial value
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy > 0) {
                    pan.setValue({ x: 0, y: gestureState.dy });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > 0 && gestureState.vy > 0) {
                    if (gestureState.vy <= -0.7 || gestureState.dy <= -100) {
                        setIsAnimating(true);
                        Animated.timing(pan, {
                            toValue: { x: 0, y: -height },
                            ...TIMING_CONFIG,
                            useNativeDriver: true,
                        }).start(() => {
                            setIsAnimating(false);
                            handleOnClose()
                        });
                    } else if (gestureState.vy >= 0.5 || gestureState.dy >= 100) {
                        setIsAnimating(true);
                        Animated.timing(pan, {
                            toValue: { x: 0, y: height },
                            ...TIMING_CONFIG,
                            useNativeDriver: true,
                        }).start(() => {
                            setIsAnimating(false);
                            handleOnClose()
                        });
                    } else {
                        setIsAnimating(true);
                        Animated.spring(pan, {
                            toValue: 0,
                            useNativeDriver: true,
                        }).start(() => {
                            setIsAnimating(false);
                        });
                    }
                } else {
                    setIsAnimating(true);
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start(() => {
                        setIsAnimating(false);
                    });
                }
            },
        })
    ).current;

    useEffect(() => {
        if (visible) {
            animatedValueX = 0;
            animatedValueY = 0;
            pan.setOffset({
                x: animatedValueX,
                y: animatedValueY,
            });
            pan.setValue({
                x: 0,
                y: height,
            }); // Initial value
            pan.x.addListener((value) => (animatedValueX = value.value));
            pan.y.addListener((value) => (animatedValueY = value.value));
            setModalVisible(true)
        } else {
            setIsAnimating(true);
            Animated.timing(pan, {
                toValue: { x: 0, y: height },
                ...TIMING_CONFIG,
                useNativeDriver: true,
            }).start(() => {
                setIsAnimating(false);
                handleOnClose()
            });
        }
    }, [visible]);



    let getContainerStyle = (opacity) => {
        return [
            [
                styles.container,
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    opacity: opacity,
                    marginTop: marginTop,
                    backgroundColor: drawerBackgroundColor,
                    borderTopLeftRadius: borderTopRadius,
                    borderTopRightRadius: borderTopRadius,
                    
                },
            ],
        ];
    };

    let getBodyStyle = (opacity) => {
        return [
            [
                styles.background,
                {
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    opacity: opacity,
                    marginTop: marginTop,
                    
                },
            ],

        ];
    };

    let getMainStyle = (opacity) => {
        return [
            [
                styles.containerModal,
                {
                    opacity: opacity,
                    backgroundColor: backgroundColor,
                },
            ],

        ];
    };

    let interpolateBackgroundOpacity = pan.y.interpolate({
        inputRange: [-height, 0, height],
        outputRange: [1, 1, 1],
    });

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onShow={() => {
                setIsAnimating(true);
                Animated.timing(pan, {
                    ...TIMING_CONFIG,
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start(() => {
                    setIsAnimating(false);
                });
            }}
        >
            <Animated.View style={getMainStyle(interpolateBackgroundOpacity)}>
                <Animated.View
                    style={getBodyStyle(interpolateBackgroundOpacity)}
                    {...panResponder.panHandlers}
                >
                    <TouchableWithoutFeedback
                        style={styles.touchable}
                    >
                        <ImageBackground style={{
                            width: '100%',
                            height:'100%',
                            paddingTop: headerH,
                            backgroundColor: drawerBackgroundColor,
                            borderTopLeftRadius: borderTopRadius,
                            borderTopRightRadius: borderTopRadius
                        }} >
                            {children}
                        </ImageBackground>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Animated.View
                    style={getContainerStyle(interpolateBackgroundOpacity)}
                    {...panResponder.panHandlers}
                >
                    <TouchableWithoutFeedback
                        onLayout={(event) => {
                            const { height } = event.nativeEvent.layout;
                            setHeaderH(height)
                        }}
                    >
                        {customHeader ?
                            customHeader :
                            <View
                                style={{
                                    height: headerH,
                                    borderBottomColor: 'wheat',
                                    borderBottomWidth: .5,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: 'grey' }} />
                            </View>
                        }
                    </TouchableWithoutFeedback>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    background: {
        opacity: 0,
        flex: 1,
    },
    container: {
        width: "100%",
        flex: 1,
        position: 'absolute',
        overflow: 'hidden'
    },
    containerModal: {
        flex: 1,
    },
    touchable: {
        flex: 1,
    },
});

export default SwipeDownModal;