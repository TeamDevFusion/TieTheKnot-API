import { TokenUser as TKUser } from "hichchi-nestjs-auth/auth/types/token-user.type";
import { UserEntity } from "../../modules/user";

export type TokenUser = TKUser & UserEntity;
