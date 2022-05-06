import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../../components/Widget';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { theme } from '../../theme';
import { styles } from './styles';
import { Button } from '../Button';
import { Copyright } from '../Copyright';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackSent: () => void;
    onFeedbackCanceled: () => void;
}

export function Form({ feedbackType, onFeedbackSent, onFeedbackCanceled }: Props) {
    const [comment, setComment] = useState('');
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
            .then(uri => setScreenshot(uri))
            .catch(error => console.log(error));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return;
        }

        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });
        try {
            await api.post('/feedback', {
                type: feedbackType,
                comment,
                screenshot: `data:image/png;base64, ${screenshotBase64}`
            });
            onFeedbackSent();
        } catch(error) {
            console.log(error);
        } finally {
            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight={'bold'}
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>
            <TextInput
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />
            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeScreenshot={handleScreenshot}
                    onRemoveScreenshot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button
                    onPress={handleSendFeedback}
                    isLoading={isSendingFeedback}
                />
            </View>
            <Copyright />
        </View>
    );
}