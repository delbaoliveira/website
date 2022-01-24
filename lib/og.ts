// double escape for commas and slashes
const e = (str: string) => encodeURIComponent(encodeURIComponent(str))

export const createOgImage = ({
  title: t,
  meta: m,
}: {
  title: string
  meta: string
}) => {
  return `https://res.cloudinary.com/delba/image/upload/c_scale,w_1600,h_836,q_95/c_fit,co_rgb:FFF,l_text:Karla_64_bold:${e(
    t,
  )},w_1400/fl_layer_apply,g_south_west,x_100,y_160/c_fit,co_rgb:FFFFFF70,l_text:Karla_40:${e(
    m,
  )},w_1400/fl_layer_apply,g_south_west,x_100,y_100/l_delba/fl_layer_apply,w_140,g_north_west,x_100,y_100/bg.png`
}
