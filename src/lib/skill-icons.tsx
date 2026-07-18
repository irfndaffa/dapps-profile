import type { IconType } from "react-icons";
import {
  SiAndroid,
  SiApachekafka,
  SiGo,
  SiHibernate,
  SiJavascript,
  SiKotlin,
  SiNodedotjs,
  SiPython,
  SiSequelize,
  SiSpring,
  SiTypescript,
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import {
  TbApi,
  TbBrowser,
  TbDatabase,
  TbDatabaseImport,
  TbFileSpreadsheet,
  TbPlugConnected,
  TbTopologyStar3,
} from "react-icons/tb";

import type { SkillIcon } from "@/lib/profile-data";

export const skillIconMap: Record<SkillIcon, IconType> = {
  java: DiJava,
  go: SiGo,
  javascript: SiJavascript,
  typescript: SiTypescript,
  kotlin: SiKotlin,
  sql: TbDatabase,
  python: SiPython,
  spring: SiSpring,
  hibernate: SiHibernate,
  nodejs: SiNodedotjs,
  sequelize: SiSequelize,
  api: TbApi,
  microservices: TbTopologyStar3,
  webmethods: TbPlugConnected,
  kafka: SiApachekafka,
  pentaho: TbDatabaseImport,
  poi: TbFileSpreadsheet,
  android: SiAndroid,
  webview: TbBrowser,
};
