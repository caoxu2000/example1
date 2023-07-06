import { regPointTypes } from './type/regPointTypes'
import { touchImagePoint, touchNavPoint } from './type/regPoint'

export const imagePoints = {
  demoLeeImagePoints: [
    {
      x: '194.651',
      y: '134.027',
      z: '82.6364',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '188.262',
      y: '161.449',
      z: '60.1868',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '140.411',
      y: '36.6048',
      z: '90.503',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '191.099',
      y: '105.193',
      z: '52.2517',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '128.141',
      y: '145.647',
      z: '172.675',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '37.5416',
      y: '155.266',
      z: '93.2808',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '33.2074',
      y: '98.8716',
      z: '88.1476',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '109.494',
      y: '27.0859',
      z: '82.6239',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '33.4715',
      y: '123.93',
      z: '109.684',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    },
    {
      x: '80.0209',
      y: '39.6999',
      z: '102.685',
      norm_x: '0',
      norm_y: '0',
      norm_z: '0'
    }
  ]
} as Record<regPointTypes, touchImagePoint>

export const navPoints = {
  demoLee1mmRegTouch: [
    {
      offset: 0,
      point: [-72.2987, 147.83, -50.0151]
    },
    {
      offset: 0,
      point: [-79.3501, 150.112, -13.7448]
    },
    {
      offset: 0,
      point: [-75.3172, 192.957, -14.831]
    },
    {
      offset: 0,
      point: [-11.8923, 77.2736, 40.283]
    }
  ],

  demoLee6mmRegTouch: [
    {
      offset: 0,
      point: [-74.5816, 142.088, -48.403]
    },
    {
      offset: 0,
      point: [-83.9962, 150.911, -13.9728]
    },
    {
      offset: 0,
      point: [-79.0623, 192.929, -16.2891]
    },
    {
      offset: 0,
      point: [5.00889, 228.145, 65.5639]
    }
  ]
} as Record<regPointTypes, touchNavPoint>
