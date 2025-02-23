import { LightdashConfig, SmtpConfig } from '../../config/parseConfig';

export const passwordResetLinkMock = {
    code: 'code',
    expiresAt: new Date(),
    email: 'demo@lightdash.com',
    url: 'htt://localhost:3000/reset-password/code',
    isExpired: false,
};

export const lightdashConfigWithNoSMTP: Pick<LightdashConfig, 'smtp'> = {
    smtp: undefined,
};

const smtpBase: SmtpConfig = {
    host: 'host',
    secure: true,
    port: 587,
    auth: {
        user: 'user',
        pass: 'pass',
        accessToken: undefined,
    },
    sender: {
        name: 'name',
        email: 'email',
    },
    allowInvalidCertificate: false,
};

export const lightdashConfigWithBasicSMTP: Pick<LightdashConfig, 'smtp'> = {
    smtp: {
        ...smtpBase,
    },
};

export const lightdashConfigWithOauth2SMTP: Pick<LightdashConfig, 'smtp'> = {
    smtp: {
        ...smtpBase,
        auth: {
            user: 'user',
            pass: undefined,
            accessToken: 'accessToken',
        },
    },
};

export const lightdashConfigWithSecurePortSMTP: Pick<LightdashConfig, 'smtp'> =
    {
        smtp: {
            ...smtpBase,
            port: 465,
        },
    };

export const expectedTransporterArgs = [
    {
        host: smtpBase.host,
        port: smtpBase.port,
        secure: false,
        auth: {
            user: smtpBase.auth.user,
            pass: smtpBase.auth.pass,
        },
        requireTLS: true,
        tls: undefined,
    },
    {
        from: `"${smtpBase.sender.name}" <${smtpBase.sender.email}>`,
    },
];

export const expectedTransporterWithOauth2Args = [
    {
        ...expectedTransporterArgs[0],
        auth: {
            type: 'OAuth2',
            user: lightdashConfigWithOauth2SMTP.smtp?.auth.user,
            accessToken: lightdashConfigWithOauth2SMTP.smtp?.auth.accessToken,
        },
    },
    expectedTransporterArgs[1],
];

export const expectedTransporterWithSecurePortArgs = [
    {
        ...expectedTransporterArgs[0],
        port: 465,
        secure: true,
    },
    expectedTransporterArgs[1],
];
