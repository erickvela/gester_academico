
// Nota sobre migraciones y archivos autogenerados
import type {
  CodecTypes as PgTypes,
  ParameterizedOutputTypesForTypeParams as PgParameterizedOutputTypes,
} from '@prisma/orm-postgres/target/codec-types';
import type { QueryOperationTypes as PgTargetQueryOps } from '@prisma/orm-postgres/target/operation-types';

import type {
  ColumnTypesFromStorage,
  ContractWithTypeMaps,
  RelationKeys,
  TypeMaps as TypeMapsType,
} from '@prisma/orm-postgres/family-contract/types';
import type {
  Contract as ContractType,
  ExecutionHashBase,
  FieldTypesFromDomain,
  NamespaceId,
  ProfileHashBase,
  StorageHashBase,
} from '@prisma/orm-postgres/contract/types';

export type StorageHash =
  StorageHashBase<'6296e188d0429233fecbf69f812a2bbc0c0c052056be482760cf778cf409597b'>;
export type ExecutionHash =
  ExecutionHashBase<'1248095902df70672b56420adfab83ee2031c8dc87f8fbbbf0563f1765e345d0'>;
export type ProfileHash =
  ProfileHashBase<'3916f444a8a17ad749191acf9e08dad97d1a327b88c2f1d45d12f240296aa8b2'>;

export type CodecTypes = PgTypes;
export type LaneCodecTypes = CodecTypes;
export type QueryOperationTypes = PgTargetQueryOps<CodecTypes>;
export type AggregateTypes = {
  readonly avg: {
    readonly byCodec: {
      readonly 'pg/float@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/float4@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/float8@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/int@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/int2@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/int4@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/int8@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/int8number@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/interval-string@1': {
        readonly output: 'pg/interval-string@1';
        readonly nullable: true;
      };
      readonly 'pg/interval@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/numeric@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/time-string@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/time-temporal@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/unboundedint@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'sql/float@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'sql/int@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
    };
  };
  readonly avgDecimal: {
    readonly byCodec: {
      readonly 'pg/int@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/int2@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/int4@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/int8@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/int8number@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/numeric@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/unboundedint@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'sql/int@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
    };
  };
  readonly count: {
    readonly byCodec: {};
    readonly withoutInput: { readonly output: 'pg/int8number@1'; readonly nullable: false };
    readonly anyInput: { readonly output: 'pg/int8number@1'; readonly nullable: false };
  };
  readonly countBigInt: {
    readonly byCodec: {};
    readonly withoutInput: { readonly output: 'pg/int8@1'; readonly nullable: false };
    readonly anyInput: { readonly output: 'pg/int8@1'; readonly nullable: false };
  };
  readonly max: {
    readonly byCodec: {
      readonly 'pg/char@1': { readonly output: 'pg/char@1'; readonly nullable: true };
      readonly 'pg/date-string@1': { readonly output: 'pg/date-string@1'; readonly nullable: true };
      readonly 'pg/date-temporal@1': {
        readonly output: 'pg/date-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/enum@1': { readonly output: 'pg/enum@1'; readonly nullable: true };
      readonly 'pg/float@1': { readonly output: 'pg/float@1'; readonly nullable: true };
      readonly 'pg/float4@1': { readonly output: 'pg/float4@1'; readonly nullable: true };
      readonly 'pg/float8@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/inet@1': { readonly output: 'pg/inet@1'; readonly nullable: true };
      readonly 'pg/int@1': { readonly output: 'pg/int@1'; readonly nullable: true };
      readonly 'pg/int2@1': { readonly output: 'pg/int2@1'; readonly nullable: true };
      readonly 'pg/int4@1': { readonly output: 'pg/int4@1'; readonly nullable: true };
      readonly 'pg/int8@1': { readonly output: 'pg/int8@1'; readonly nullable: true };
      readonly 'pg/int8number@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/interval-string@1': {
        readonly output: 'pg/interval-string@1';
        readonly nullable: true;
      };
      readonly 'pg/interval@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/numeric@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/text-array@1': { readonly output: 'pg/text-array@1'; readonly nullable: true };
      readonly 'pg/text@1': { readonly output: 'pg/text@1'; readonly nullable: true };
      readonly 'pg/time-string@1': { readonly output: 'pg/time-string@1'; readonly nullable: true };
      readonly 'pg/time-temporal@1': {
        readonly output: 'pg/time-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-date@1': {
        readonly output: 'pg/timestamp-date@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-instant@1': {
        readonly output: 'pg/timestamp-instant@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-string@1': {
        readonly output: 'pg/timestamp-string@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-temporal@1': {
        readonly output: 'pg/timestamp-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamptz-date@1': {
        readonly output: 'pg/timestamptz-date@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamptz-string@1': {
        readonly output: 'pg/timestamptz-string@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamptz-temporal@1': {
        readonly output: 'pg/timestamptz-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/timetz@1': { readonly output: 'pg/timetz@1'; readonly nullable: true };
      readonly 'pg/unboundedint@1': {
        readonly output: 'pg/unboundedint@1';
        readonly nullable: true;
      };
      readonly 'pg/varchar@1': { readonly output: 'pg/text@1'; readonly nullable: true };
      readonly 'sql/char@1': { readonly output: 'sql/char@1'; readonly nullable: true };
      readonly 'sql/float@1': { readonly output: 'sql/float@1'; readonly nullable: true };
      readonly 'sql/int@1': { readonly output: 'sql/int@1'; readonly nullable: true };
      readonly 'sql/text@1': { readonly output: 'sql/text@1'; readonly nullable: true };
      readonly 'sql/varchar@1': { readonly output: 'pg/text@1'; readonly nullable: true };
    };
  };
  readonly min: {
    readonly byCodec: {
      readonly 'pg/char@1': { readonly output: 'pg/char@1'; readonly nullable: true };
      readonly 'pg/date-string@1': { readonly output: 'pg/date-string@1'; readonly nullable: true };
      readonly 'pg/date-temporal@1': {
        readonly output: 'pg/date-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/enum@1': { readonly output: 'pg/enum@1'; readonly nullable: true };
      readonly 'pg/float@1': { readonly output: 'pg/float@1'; readonly nullable: true };
      readonly 'pg/float4@1': { readonly output: 'pg/float4@1'; readonly nullable: true };
      readonly 'pg/float8@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/inet@1': { readonly output: 'pg/inet@1'; readonly nullable: true };
      readonly 'pg/int@1': { readonly output: 'pg/int@1'; readonly nullable: true };
      readonly 'pg/int2@1': { readonly output: 'pg/int2@1'; readonly nullable: true };
      readonly 'pg/int4@1': { readonly output: 'pg/int4@1'; readonly nullable: true };
      readonly 'pg/int8@1': { readonly output: 'pg/int8@1'; readonly nullable: true };
      readonly 'pg/int8number@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/interval-string@1': {
        readonly output: 'pg/interval-string@1';
        readonly nullable: true;
      };
      readonly 'pg/interval@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/numeric@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/text-array@1': { readonly output: 'pg/text-array@1'; readonly nullable: true };
      readonly 'pg/text@1': { readonly output: 'pg/text@1'; readonly nullable: true };
      readonly 'pg/time-string@1': { readonly output: 'pg/time-string@1'; readonly nullable: true };
      readonly 'pg/time-temporal@1': {
        readonly output: 'pg/time-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-date@1': {
        readonly output: 'pg/timestamp-date@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-instant@1': {
        readonly output: 'pg/timestamp-instant@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-string@1': {
        readonly output: 'pg/timestamp-string@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamp-temporal@1': {
        readonly output: 'pg/timestamp-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamptz-date@1': {
        readonly output: 'pg/timestamptz-date@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamptz-string@1': {
        readonly output: 'pg/timestamptz-string@1';
        readonly nullable: true;
      };
      readonly 'pg/timestamptz-temporal@1': {
        readonly output: 'pg/timestamptz-temporal@1';
        readonly nullable: true;
      };
      readonly 'pg/timetz@1': { readonly output: 'pg/timetz@1'; readonly nullable: true };
      readonly 'pg/unboundedint@1': {
        readonly output: 'pg/unboundedint@1';
        readonly nullable: true;
      };
      readonly 'pg/varchar@1': { readonly output: 'pg/text@1'; readonly nullable: true };
      readonly 'sql/char@1': { readonly output: 'sql/char@1'; readonly nullable: true };
      readonly 'sql/float@1': { readonly output: 'sql/float@1'; readonly nullable: true };
      readonly 'sql/int@1': { readonly output: 'sql/int@1'; readonly nullable: true };
      readonly 'sql/text@1': { readonly output: 'sql/text@1'; readonly nullable: true };
      readonly 'sql/varchar@1': { readonly output: 'pg/text@1'; readonly nullable: true };
    };
  };
  readonly sum: {
    readonly byCodec: {
      readonly 'pg/float@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/float4@1': { readonly output: 'pg/float4@1'; readonly nullable: true };
      readonly 'pg/float8@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'pg/int@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/int2@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/int4@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/int8@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/int8number@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
      readonly 'pg/interval-string@1': {
        readonly output: 'pg/interval-string@1';
        readonly nullable: true;
      };
      readonly 'pg/interval@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/numeric@1': { readonly output: 'pg/numeric@1'; readonly nullable: true };
      readonly 'pg/time-string@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/time-temporal@1': { readonly output: 'pg/interval@1'; readonly nullable: true };
      readonly 'pg/unboundedint@1': {
        readonly output: 'pg/unboundedint@1';
        readonly nullable: true;
      };
      readonly 'sql/float@1': { readonly output: 'pg/float8@1'; readonly nullable: true };
      readonly 'sql/int@1': { readonly output: 'pg/int8number@1'; readonly nullable: true };
    };
  };
  readonly sumBigInt: {
    readonly byCodec: {
      readonly 'pg/int@1': { readonly output: 'pg/int8@1'; readonly nullable: true };
      readonly 'pg/int2@1': { readonly output: 'pg/int8@1'; readonly nullable: true };
      readonly 'pg/int4@1': { readonly output: 'pg/int8@1'; readonly nullable: true };
      readonly 'pg/int8@1': { readonly output: 'pg/unboundedint@1'; readonly nullable: true };
      readonly 'pg/int8number@1': { readonly output: 'pg/unboundedint@1'; readonly nullable: true };
      readonly 'pg/unboundedint@1': {
        readonly output: 'pg/unboundedint@1';
        readonly nullable: true;
      };
      readonly 'sql/int@1': { readonly output: 'pg/int8@1'; readonly nullable: true };
    };
  };
};
type DefaultLiteralValue<CodecId extends string, Encoded> = CodecId extends keyof CodecTypes
  ? Encoded extends CodecTypes[CodecId]['json']
    ? Encoded
    : CodecTypes[CodecId]['json']
  : Encoded;
type ParameterizedOutputTypeFunctions = PgParameterizedOutputTypes;

type FieldTypeOverrides = {
  readonly public: {
    readonly models: {
      readonly Student: {
        readonly status: {
          readonly output: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
          readonly input: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
        };
      };
      readonly User: {
        readonly role: {
          readonly output: 'ADMIN' | 'TEACHER' | 'STUDENT';
          readonly input: 'ADMIN' | 'TEACHER' | 'STUDENT';
        };
      };
    };
  };
};
export type FieldOutputTypes = FieldTypesFromDomain<
  ContractBase['domain']['namespaces'],
  CodecTypes,
  ParameterizedOutputTypeFunctions,
  FieldTypeOverrides,
  'output'
>;
export type FieldInputTypes = FieldTypesFromDomain<
  ContractBase['domain']['namespaces'],
  CodecTypes,
  ParameterizedOutputTypeFunctions,
  FieldTypeOverrides,
  'input'
>;
type ColumnTypeOverrides = {
  readonly public: {
    readonly students: {
      readonly status: {
        readonly output: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
        readonly input: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
      };
    };
    readonly users: {
      readonly role: {
        readonly output: 'ADMIN' | 'TEACHER' | 'STUDENT';
        readonly input: 'ADMIN' | 'TEACHER' | 'STUDENT';
      };
    };
  };
};
export type StorageColumnTypes = ColumnTypesFromStorage<
  ContractBase['storage'],
  CodecTypes,
  ParameterizedOutputTypeFunctions,
  ColumnTypeOverrides,
  'output'
>;
export type StorageColumnInputTypes = ColumnTypesFromStorage<
  ContractBase['storage'],
  CodecTypes,
  ParameterizedOutputTypeFunctions,
  ColumnTypeOverrides,
  'input'
>;

export namespace Models {
  export type public_AuditLog = {
    action: FieldOutputTypes['public']['AuditLog']['action'];
    createdAt: FieldOutputTypes['public']['AuditLog']['createdAt'];
    details: FieldOutputTypes['public']['AuditLog']['details'];
    id: FieldOutputTypes['public']['AuditLog']['id'];
    ipAddress: FieldOutputTypes['public']['AuditLog']['ipAddress'];
    userId: FieldOutputTypes['public']['AuditLog']['userId'];
    user: public_User;
    readonly [RelationKeys]?: 'user';
  };
  export type public_Course = {
    code: FieldOutputTypes['public']['Course']['code'];
    createdAt: FieldOutputTypes['public']['Course']['createdAt'];
    credits: FieldOutputTypes['public']['Course']['credits'];
    description: FieldOutputTypes['public']['Course']['description'];
    id: FieldOutputTypes['public']['Course']['id'];
    name: FieldOutputTypes['public']['Course']['name'];
    teacherId: FieldOutputTypes['public']['Course']['teacherId'];
    updatedAt: FieldOutputTypes['public']['Course']['updatedAt'];
    enrollments: public_Enrollment[];
    grades: public_Grade[];
    teacher: public_User;
    readonly [RelationKeys]?: 'enrollments' | 'grades' | 'teacher';
  };
  export type public_Enrollment = {
    courseId: FieldOutputTypes['public']['Enrollment']['courseId'];
    createdAt: FieldOutputTypes['public']['Enrollment']['createdAt'];
    id: FieldOutputTypes['public']['Enrollment']['id'];
    studentId: FieldOutputTypes['public']['Enrollment']['studentId'];
    course: public_Course;
    student: public_Student;
    readonly [RelationKeys]?: 'course' | 'student';
  };
  export type public_Grade = {
    courseId: FieldOutputTypes['public']['Grade']['courseId'];
    createdAt: FieldOutputTypes['public']['Grade']['createdAt'];
    id: FieldOutputTypes['public']['Grade']['id'];
    maxScore: FieldOutputTypes['public']['Grade']['maxScore'];
    percentage: FieldOutputTypes['public']['Grade']['percentage'];
    score: FieldOutputTypes['public']['Grade']['score'];
    studentId: FieldOutputTypes['public']['Grade']['studentId'];
    title: FieldOutputTypes['public']['Grade']['title'];
    updatedAt: FieldOutputTypes['public']['Grade']['updatedAt'];
    course: public_Course;
    student: public_Student;
    readonly [RelationKeys]?: 'course' | 'student';
  };
  export type public_Student = {
    code: FieldOutputTypes['public']['Student']['code'];
    createdAt: FieldOutputTypes['public']['Student']['createdAt'];
    email: FieldOutputTypes['public']['Student']['email'];
    firstName: FieldOutputTypes['public']['Student']['firstName'];
    id: FieldOutputTypes['public']['Student']['id'];
    lastName: FieldOutputTypes['public']['Student']['lastName'];
    status: FieldOutputTypes['public']['Student']['status'];
    updatedAt: FieldOutputTypes['public']['Student']['updatedAt'];
    enrollments: public_Enrollment[];
    grades: public_Grade[];
    readonly [RelationKeys]?: 'enrollments' | 'grades';
  };
  export type public_User = {
    createdAt: FieldOutputTypes['public']['User']['createdAt'];
    email: FieldOutputTypes['public']['User']['email'];
    firstName: FieldOutputTypes['public']['User']['firstName'];
    id: FieldOutputTypes['public']['User']['id'];
    isActive: FieldOutputTypes['public']['User']['isActive'];
    lastName: FieldOutputTypes['public']['User']['lastName'];
    password: FieldOutputTypes['public']['User']['password'];
    role: FieldOutputTypes['public']['User']['role'];
    updatedAt: FieldOutputTypes['public']['User']['updatedAt'];
    logs: public_AuditLog[];
    teacherCourses: public_Course[];
    readonly [RelationKeys]?: 'logs' | 'teacherCourses';
  };
}

export declare const models: {
  public: {
    AuditLog: Models.public_AuditLog;
    Course: Models.public_Course;
    Enrollment: Models.public_Enrollment;
    Grade: Models.public_Grade;
    Student: Models.public_Student;
    User: Models.public_User;
  };
};

export type TypeMaps = TypeMapsType<
  CodecTypes,
  QueryOperationTypes,
  FieldOutputTypes,
  FieldInputTypes,
  StorageColumnTypes,
  StorageColumnInputTypes,
  AggregateTypes
>;

type ContractBase = Omit<
  ContractType<{
    readonly namespaces: {
      readonly public: {
        readonly id: 'public';
        readonly kind: 'postgres-schema';
        readonly entries: {
          readonly table: {
            readonly audit_logs: {
              columns: {
                readonly action: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly createdAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly default: { readonly kind: 'function'; readonly expression: 'now()' };
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
                readonly details: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: true;
                  readonly many: false;
                };
                readonly id: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly ipAddress: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: true;
                  readonly many: false;
                };
                readonly userId: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
              };
              primaryKey: { readonly columns: readonly ['id'] };
              uniques: readonly [];
              indexes: readonly [];
              foreignKeys: readonly [
                {
                  readonly source: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'audit_logs';
                    readonly columns: readonly ['userId'];
                  };
                  readonly target: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'users';
                    readonly columns: readonly ['id'];
                  };
                },
              ];
            };
            readonly courses: {
              columns: {
                readonly code: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly createdAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly default: { readonly kind: 'function'; readonly expression: 'now()' };
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
                readonly credits: {
                  readonly dataType: 'pg/int4';
                  readonly codecId: 'pg/int4@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly description: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: true;
                  readonly many: false;
                };
                readonly id: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly name: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly teacherId: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly updatedAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
              };
              primaryKey: { readonly columns: readonly ['id'] };
              uniques: readonly [];
              indexes: readonly [
                {
                  readonly name: 'courses_code_key';
                  readonly columns: readonly ['code'];
                  readonly unique: true;
                },
              ];
              foreignKeys: readonly [
                {
                  readonly source: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'courses';
                    readonly columns: readonly ['teacherId'];
                  };
                  readonly target: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'users';
                    readonly columns: readonly ['id'];
                  };
                },
              ];
            };
            readonly enrollments: {
              columns: {
                readonly courseId: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly createdAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly default: { readonly kind: 'function'; readonly expression: 'now()' };
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
                readonly id: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly studentId: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
              };
              primaryKey: { readonly columns: readonly ['id'] };
              uniques: readonly [];
              indexes: readonly [
                {
                  readonly name: 'enrollments_studentId_courseId_key';
                  readonly columns: readonly ['studentId', 'courseId'];
                  readonly unique: true;
                },
              ];
              foreignKeys: readonly [
                {
                  readonly source: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'enrollments';
                    readonly columns: readonly ['studentId'];
                  };
                  readonly target: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'students';
                    readonly columns: readonly ['id'];
                  };
                },
                {
                  readonly source: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'enrollments';
                    readonly columns: readonly ['courseId'];
                  };
                  readonly target: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'courses';
                    readonly columns: readonly ['id'];
                  };
                },
              ];
            };
            readonly grades: {
              columns: {
                readonly courseId: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly createdAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly default: { readonly kind: 'function'; readonly expression: 'now()' };
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
                readonly id: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly maxScore: {
                  readonly dataType: 'pg/float8';
                  readonly codecId: 'pg/float8@1';
                  readonly nullable: false;
                  readonly default: {
                    readonly kind: 'literal';
                    readonly value: DefaultLiteralValue<'pg/float8@1', 100>;
                  };
                  readonly many: false;
                };
                readonly percentage: {
                  readonly dataType: 'pg/float8';
                  readonly codecId: 'pg/float8@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly score: {
                  readonly dataType: 'pg/float8';
                  readonly codecId: 'pg/float8@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly studentId: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly title: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly updatedAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
              };
              primaryKey: { readonly columns: readonly ['id'] };
              uniques: readonly [];
              indexes: readonly [];
              foreignKeys: readonly [
                {
                  readonly source: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'grades';
                    readonly columns: readonly ['studentId'];
                  };
                  readonly target: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'students';
                    readonly columns: readonly ['id'];
                  };
                },
                {
                  readonly source: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'grades';
                    readonly columns: readonly ['courseId'];
                  };
                  readonly target: {
                    readonly namespaceId: 'public' & NamespaceId;
                    readonly tableName: 'courses';
                    readonly columns: readonly ['id'];
                  };
                },
              ];
            };
            readonly students: {
              columns: {
                readonly code: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly createdAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly default: { readonly kind: 'function'; readonly expression: 'now()' };
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
                readonly email: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly firstName: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly id: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly lastName: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly status: {
                  readonly dataType: 'pg/enum';
                  readonly codecId: 'pg/enum@1';
                  readonly nullable: false;
                  readonly default: {
                    readonly kind: 'literal';
                    readonly value: DefaultLiteralValue<'pg/enum@1', 'ACTIVE'>;
                  };
                  readonly typeParams: { readonly typeName: 'StudentStatus' };
                  readonly many: false;
                };
                readonly updatedAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
              };
              primaryKey: { readonly columns: readonly ['id'] };
              uniques: readonly [];
              indexes: readonly [
                {
                  readonly name: 'students_code_key';
                  readonly columns: readonly ['code'];
                  readonly unique: true;
                },
                {
                  readonly name: 'students_email_key';
                  readonly columns: readonly ['email'];
                  readonly unique: true;
                },
              ];
              foreignKeys: readonly [];
            };
            readonly users: {
              columns: {
                readonly createdAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly default: { readonly kind: 'function'; readonly expression: 'now()' };
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
                readonly email: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly firstName: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly id: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly isActive: {
                  readonly dataType: 'pg/bool';
                  readonly codecId: 'pg/bool@1';
                  readonly nullable: false;
                  readonly default: {
                    readonly kind: 'literal';
                    readonly value: DefaultLiteralValue<'pg/bool@1', true>;
                  };
                  readonly many: false;
                };
                readonly lastName: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly password: {
                  readonly dataType: 'pg/text';
                  readonly codecId: 'pg/text@1';
                  readonly nullable: false;
                  readonly many: false;
                };
                readonly role: {
                  readonly dataType: 'pg/enum';
                  readonly codecId: 'pg/enum@1';
                  readonly nullable: false;
                  readonly default: {
                    readonly kind: 'literal';
                    readonly value: DefaultLiteralValue<'pg/enum@1', 'TEACHER'>;
                  };
                  readonly typeParams: { readonly typeName: 'Role' };
                  readonly many: false;
                };
                readonly updatedAt: {
                  readonly dataType: 'pg/timestamp';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly nullable: false;
                  readonly typeParams: { readonly precision: 3 };
                  readonly many: false;
                };
              };
              primaryKey: { readonly columns: readonly ['id'] };
              uniques: readonly [];
              indexes: readonly [
                {
                  readonly name: 'users_email_key';
                  readonly columns: readonly ['email'];
                  readonly unique: true;
                },
              ];
              foreignKeys: readonly [];
            };
          };
          readonly valueSet: {
            readonly Role: {
              readonly kind: 'valueSet';
              readonly values: readonly ['ADMIN', 'TEACHER', 'STUDENT'];
            };
            readonly StudentStatus: {
              readonly kind: 'valueSet';
              readonly values: readonly ['ACTIVE', 'INACTIVE', 'GRADUATED'];
            };
          };
        };
      };
    };
    readonly storageHash: StorageHash;
  }>,
  'roots' | 'domain'
> & {
  readonly target: 'postgres';
  readonly targetFamily: 'sql';
  readonly roots: {
    readonly audit_logs: { readonly namespace: 'public' & NamespaceId; readonly model: 'AuditLog' };
    readonly courses: { readonly namespace: 'public' & NamespaceId; readonly model: 'Course' };
    readonly enrollments: {
      readonly namespace: 'public' & NamespaceId;
      readonly model: 'Enrollment';
    };
    readonly grades: { readonly namespace: 'public' & NamespaceId; readonly model: 'Grade' };
    readonly students: { readonly namespace: 'public' & NamespaceId; readonly model: 'Student' };
    readonly users: { readonly namespace: 'public' & NamespaceId; readonly model: 'User' };
  };
  readonly domain: {
    readonly namespaces: {
      readonly public: {
        readonly models: {
          readonly AuditLog: {
            readonly fields: {
              readonly action: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly createdAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
              readonly details: {
                readonly nullable: true;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly id: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly ipAddress: {
                readonly nullable: true;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly userId: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
            };
            readonly relations: {
              readonly user: {
                readonly to: { readonly namespace: 'public' & NamespaceId; readonly model: 'User' };
                readonly cardinality: 'N:1';
                readonly nullable: false;
                readonly on: {
                  readonly localFields: readonly ['userId'];
                  readonly targetFields: readonly ['id'];
                };
              };
            };
            readonly storage: {
              readonly table: 'audit_logs';
              readonly namespaceId: 'public';
              readonly fields: {
                readonly action: { readonly column: 'action' };
                readonly createdAt: { readonly column: 'createdAt' };
                readonly details: { readonly column: 'details' };
                readonly id: { readonly column: 'id' };
                readonly ipAddress: { readonly column: 'ipAddress' };
                readonly userId: { readonly column: 'userId' };
              };
            };
          };
          readonly Course: {
            readonly fields: {
              readonly code: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly createdAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
              readonly credits: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/int4@1' };
              };
              readonly description: {
                readonly nullable: true;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly id: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly name: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly teacherId: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly updatedAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
            };
            readonly relations: {
              readonly enrollments: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Enrollment';
                };
                readonly cardinality: '1:N';
                readonly on: {
                  readonly localFields: readonly ['id'];
                  readonly targetFields: readonly ['courseId'];
                };
              };
              readonly grades: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Grade';
                };
                readonly cardinality: '1:N';
                readonly on: {
                  readonly localFields: readonly ['id'];
                  readonly targetFields: readonly ['courseId'];
                };
              };
              readonly teacher: {
                readonly to: { readonly namespace: 'public' & NamespaceId; readonly model: 'User' };
                readonly cardinality: 'N:1';
                readonly nullable: false;
                readonly on: {
                  readonly localFields: readonly ['teacherId'];
                  readonly targetFields: readonly ['id'];
                };
              };
            };
            readonly storage: {
              readonly table: 'courses';
              readonly namespaceId: 'public';
              readonly fields: {
                readonly code: { readonly column: 'code' };
                readonly createdAt: { readonly column: 'createdAt' };
                readonly credits: { readonly column: 'credits' };
                readonly description: { readonly column: 'description' };
                readonly id: { readonly column: 'id' };
                readonly name: { readonly column: 'name' };
                readonly teacherId: { readonly column: 'teacherId' };
                readonly updatedAt: { readonly column: 'updatedAt' };
              };
            };
          };
          readonly Enrollment: {
            readonly fields: {
              readonly courseId: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly createdAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
              readonly id: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly studentId: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
            };
            readonly relations: {
              readonly course: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Course';
                };
                readonly cardinality: 'N:1';
                readonly nullable: false;
                readonly on: {
                  readonly localFields: readonly ['courseId'];
                  readonly targetFields: readonly ['id'];
                };
              };
              readonly student: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Student';
                };
                readonly cardinality: 'N:1';
                readonly nullable: false;
                readonly on: {
                  readonly localFields: readonly ['studentId'];
                  readonly targetFields: readonly ['id'];
                };
              };
            };
            readonly storage: {
              readonly table: 'enrollments';
              readonly namespaceId: 'public';
              readonly fields: {
                readonly courseId: { readonly column: 'courseId' };
                readonly createdAt: { readonly column: 'createdAt' };
                readonly id: { readonly column: 'id' };
                readonly studentId: { readonly column: 'studentId' };
              };
            };
          };
          readonly Grade: {
            readonly fields: {
              readonly courseId: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly createdAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
              readonly id: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly maxScore: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/float8@1' };
              };
              readonly percentage: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/float8@1' };
              };
              readonly score: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/float8@1' };
              };
              readonly studentId: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly title: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly updatedAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
            };
            readonly relations: {
              readonly course: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Course';
                };
                readonly cardinality: 'N:1';
                readonly nullable: false;
                readonly on: {
                  readonly localFields: readonly ['courseId'];
                  readonly targetFields: readonly ['id'];
                };
              };
              readonly student: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Student';
                };
                readonly cardinality: 'N:1';
                readonly nullable: false;
                readonly on: {
                  readonly localFields: readonly ['studentId'];
                  readonly targetFields: readonly ['id'];
                };
              };
            };
            readonly storage: {
              readonly table: 'grades';
              readonly namespaceId: 'public';
              readonly fields: {
                readonly courseId: { readonly column: 'courseId' };
                readonly createdAt: { readonly column: 'createdAt' };
                readonly id: { readonly column: 'id' };
                readonly maxScore: { readonly column: 'maxScore' };
                readonly percentage: { readonly column: 'percentage' };
                readonly score: { readonly column: 'score' };
                readonly studentId: { readonly column: 'studentId' };
                readonly title: { readonly column: 'title' };
                readonly updatedAt: { readonly column: 'updatedAt' };
              };
            };
          };
          readonly Student: {
            readonly fields: {
              readonly code: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly createdAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
              readonly email: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly firstName: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly id: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly lastName: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly status: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/enum@1';
                  readonly typeParams: { readonly typeName: 'StudentStatus' };
                };
              };
              readonly updatedAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
            };
            readonly relations: {
              readonly enrollments: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Enrollment';
                };
                readonly cardinality: '1:N';
                readonly on: {
                  readonly localFields: readonly ['id'];
                  readonly targetFields: readonly ['studentId'];
                };
              };
              readonly grades: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Grade';
                };
                readonly cardinality: '1:N';
                readonly on: {
                  readonly localFields: readonly ['id'];
                  readonly targetFields: readonly ['studentId'];
                };
              };
            };
            readonly storage: {
              readonly table: 'students';
              readonly namespaceId: 'public';
              readonly fields: {
                readonly code: { readonly column: 'code' };
                readonly createdAt: { readonly column: 'createdAt' };
                readonly email: { readonly column: 'email' };
                readonly firstName: { readonly column: 'firstName' };
                readonly id: { readonly column: 'id' };
                readonly lastName: { readonly column: 'lastName' };
                readonly status: { readonly column: 'status' };
                readonly updatedAt: { readonly column: 'updatedAt' };
              };
            };
          };
          readonly User: {
            readonly fields: {
              readonly createdAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
              readonly email: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly firstName: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly id: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly isActive: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/bool@1' };
              };
              readonly lastName: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly password: {
                readonly nullable: false;
                readonly type: { readonly kind: 'scalar'; readonly codecId: 'pg/text@1' };
              };
              readonly role: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/enum@1';
                  readonly typeParams: { readonly typeName: 'Role' };
                };
              };
              readonly updatedAt: {
                readonly nullable: false;
                readonly type: {
                  readonly kind: 'scalar';
                  readonly codecId: 'pg/timestamp-string@1';
                  readonly typeParams: { readonly precision: 3 };
                };
              };
            };
            readonly relations: {
              readonly logs: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'AuditLog';
                };
                readonly cardinality: '1:N';
                readonly on: {
                  readonly localFields: readonly ['id'];
                  readonly targetFields: readonly ['userId'];
                };
              };
              readonly teacherCourses: {
                readonly to: {
                  readonly namespace: 'public' & NamespaceId;
                  readonly model: 'Course';
                };
                readonly cardinality: '1:N';
                readonly on: {
                  readonly localFields: readonly ['id'];
                  readonly targetFields: readonly ['teacherId'];
                };
              };
            };
            readonly storage: {
              readonly table: 'users';
              readonly namespaceId: 'public';
              readonly fields: {
                readonly createdAt: { readonly column: 'createdAt' };
                readonly email: { readonly column: 'email' };
                readonly firstName: { readonly column: 'firstName' };
                readonly id: { readonly column: 'id' };
                readonly isActive: { readonly column: 'isActive' };
                readonly lastName: { readonly column: 'lastName' };
                readonly password: { readonly column: 'password' };
                readonly role: { readonly column: 'role' };
                readonly updatedAt: { readonly column: 'updatedAt' };
              };
            };
          };
        };
      };
    };
  };
  readonly capabilities: {
    readonly postgres: {
      readonly distinctOn: true;
      readonly forKeyShare: true;
      readonly forNoKeyUpdate: true;
      readonly jsonAgg: true;
      readonly lateral: true;
      readonly limit: true;
      readonly orderBy: true;
      readonly returning: true;
    };
    readonly sql: {
      readonly checkConstraint: true;
      readonly defaultInInsert: true;
      readonly enums: true;
      readonly forShare: true;
      readonly forUpdate: true;
      readonly insertOnConflictSkip: true;
      readonly insertOnConflictWithoutTarget: true;
      readonly lateral: true;
      readonly lockNowait: true;
      readonly lockOf: true;
      readonly lockSkipLocked: true;
      readonly returning: true;
      readonly scalarList: true;
    };
  };
  readonly extensions: {};
  readonly execution: {
    readonly executionHash: ExecutionHash;
    readonly mutations: {
      readonly defaults: readonly [
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'audit_logs';
            readonly field: 'createdAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: { readonly id: 'uuidv4'; readonly kind: 'generator' };
          readonly ref: {
            readonly entry: 'audit_logs';
            readonly field: 'id';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'courses';
            readonly field: 'createdAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: { readonly id: 'uuidv4'; readonly kind: 'generator' };
          readonly ref: {
            readonly entry: 'courses';
            readonly field: 'id';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly onUpdate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'courses';
            readonly field: 'updatedAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'enrollments';
            readonly field: 'createdAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: { readonly id: 'uuidv4'; readonly kind: 'generator' };
          readonly ref: {
            readonly entry: 'enrollments';
            readonly field: 'id';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'grades';
            readonly field: 'createdAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: { readonly id: 'uuidv4'; readonly kind: 'generator' };
          readonly ref: {
            readonly entry: 'grades';
            readonly field: 'id';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly onUpdate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'grades';
            readonly field: 'updatedAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'students';
            readonly field: 'createdAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: { readonly id: 'uuidv4'; readonly kind: 'generator' };
          readonly ref: {
            readonly entry: 'students';
            readonly field: 'id';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly onUpdate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'students';
            readonly field: 'updatedAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'users';
            readonly field: 'createdAt';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: { readonly id: 'uuidv4'; readonly kind: 'generator' };
          readonly ref: {
            readonly entry: 'users';
            readonly field: 'id';
            readonly namespace: 'public';
          };
        },
        {
          readonly onCreate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly onUpdate: {
            readonly id: 'timestampStringNow';
            readonly kind: 'generator';
            readonly params: { readonly precision: 3 };
          };
          readonly ref: {
            readonly entry: 'users';
            readonly field: 'updatedAt';
            readonly namespace: 'public';
          };
        },
      ];
    };
  };
  readonly meta: {};

  readonly profileHash: ProfileHash;
};

export type Contract = ContractWithTypeMaps<ContractBase, TypeMaps>;

export type Namespaces = Contract['storage']['namespaces'];
