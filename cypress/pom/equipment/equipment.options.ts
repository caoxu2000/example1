import { CssColors } from '@global-config/CssColors'

export type connectionStatus = {
  error?: string
  fixErrorStep1?: string
  fixErrorStep2?: string
  cart_connection_color?: string
  status_color: string
}
type deviceConnection = {
  DISCONNECTED?: connectionStatus
  CONNECTED?: connectionStatus
}

export type equipmentType = {
  name: string
  connectionInfo?: deviceConnection
}

export const equipment = {
  cameraCart: {
    name: 'OpticalCamera',
    connectionInfo: {
      DISCONNECTED: {
        error: 'Camera is not communicating',
        fixErrorStep1: 'Check cable connections',
        fixErrorStep2: 'Restart the system',
        cart_connection_color: CssColors.CART_CONECTION_ORANGE,
        status_color: CssColors.TOOL_CARD_YELLOW
      },
      CONNECTED: {
        status_color: CssColors.TRACKING_CARD_GREEN,
        cart_connection_color: CssColors.TRACKING_CARD_GREEN
      }
    }
  },
  robotCart: {
    name: 'Robot',
    connectionInfo: {
      DISCONNECTED: {
        error: 'Robot Cart is not communicating',
        fixErrorStep1: 'Check cable connections',
        fixErrorStep2: 'Restart the system',
        cart_connection_color: CssColors.CART_CONECTION_ORANGE,
        status_color: CssColors.TOOL_CARD_YELLOW
      },
      CONNECTED: {
        status_color: CssColors.TRACKING_CARD_GREEN,
        cart_connection_color: CssColors.TRACKING_CARD_GREEN
      }
    }
  },
  oArm: {
    name: 'O-arm™',
    connectionInfo: {
      DISCONNECTED: {
        error: 'Not connected with O-arm',
        status_color: CssColors.TOOL_CARD_YELLOW
      },
      CONNECTED: {
        status_color: CssColors.TRACKING_CARD_GREEN
      }
    }
  },
  isoC: {
    name: 'Iso-C',
    connectionInfo: {
      DISCONNECTED: {
        error: 'Connection lost',
        fixErrorStep1: 'please check video cable',
        status_color: CssColors.TOOL_CARD_YELLOW
      },
      CONNECTED: {
        status_color: CssColors.TRACKING_CARD_GREEN
      }
    }
  },
  ziehmRfd: {
    name: 'Ziehm RFD 3D C-Arm',
    connectionInfo: {
      DISCONNECTED: {
        error: 'Connection lost',
        fixErrorStep1: 'please check video cable',
        status_color: CssColors.TOOL_CARD_YELLOW
      },
      CONNECTED: {
        status_color: CssColors.TRACKING_CARD_GREEN
      }
    }
  },
  ziehmDigital: {
    name: 'Ziehm Digital C-Arm'
  },
  philipsDigital: {
    name: 'Philips Digital C-Arm'
  }
} as Record<string, equipmentType>

export const setUpErrors = {
  noSerialNumber: 'Please enter tracker serial number',
  invalidIpAddress: 'Invalid format of IP Address'
}
