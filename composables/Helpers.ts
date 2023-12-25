import { onBeforeUnmount, onMounted } from "vue";

export const getImageIcon = (name: string) => {
  const assets = import.meta.glob("~/assets/images/icon/*", {
    eager: true,
    import: "default",
  });
  return assets["/assets/images/icon/" + name];
};

export const getImage = (name: string) => {
  const assets = import.meta.glob("~/assets/images/**", {
    eager: true,
    import: "default",
  });
  return assets["/assets/images/" + name];
};
