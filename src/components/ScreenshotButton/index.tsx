import { Camera, Trash } from 'phosphor-react-native';
import React from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import { theme } from '../../theme';
import { styles } from './styles';

interface Props {
    screenshot: string | null;
    onTakeScreenshot: () => void;
    onRemoveScreenshot: () => void;
}

export function ScreenshotButton({ screenshot, onTakeScreenshot, onRemoveScreenshot }: Props) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
        >
            {
                screenshot ?
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: screenshot }}
                        />
                        <Trash
                            size={24}
                            weight={'bold'}
                            color={theme.colors.text_primary}
                            style={styles.removeIcon}
                        />
                    </View>
                    :
                    <Camera
                        size={24}
                        weight={'bold'}
                        color={theme.colors.text_primary}
                    />
            }
        </TouchableOpacity>
    );
}